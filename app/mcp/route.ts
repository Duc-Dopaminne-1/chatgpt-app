import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const COINMARKETCAP_API_URL =
  "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/rsi/heatmap/table?limit=500&page=1&volume24hRange.min=1000000&marketCapRange.min=50000000&sort=rsi4h&ascendingOrder=false";

type CoinMarketCapResponse = {
  data: {
    data: Array<{
      id: string;
      symbol: string;
      slug: string;
      name: string;
      marketCap: number;
      volume24h: number;
      price: number;
      price24h: number;
      rank: number;
      rsi: {
        rsi15m: number;
        rsi1h: number;
        rsi4h: number;
        rsi24h: number;
        rsi7d: number;
      };
    }>;
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: string;
      itemsPerPage: number;
    };
  };
  status: {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: string;
    credit_count: number;
  };
};

const handler = createMcpHandler(async (server) => {
  server.registerTool(
    "get_crypto_market_data",
    {
      title: "Get Cryptocurrency Market Data",
      description:
        "Fetches public cryptocurrency market data from CoinMarketCap API including prices, RSI indicators, market cap, and volume. This tool only retrieves publicly available market data and does not require any user information or location data. Use this when users ask about cryptocurrency prices, RSI values, top coins, market movements, or any crypto market-related questions.",
      inputSchema: {
        query: z
          .string()
          .optional()
          .describe(
            "Optional query parameter. The tool will fetch market data regardless of input. GPT will analyze the data to answer user questions."
          ),
      },
      annotations: {
        destructiveHint: false,
        openWorldHint: false,
        readOnlyHint: true,
      },
      _meta: {
        "openai/toolInvocation/invoking": "Fetching cryptocurrency market data...",
        "openai/toolInvocation/invoked": "Market data retrieved",
      },
    },
    async ({ query }) => {
      try {
        const response = await fetch(COINMARKETCAP_API_URL);

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data: CoinMarketCapResponse = await response.json();

        if (data.status.error_code !== "0") {
          throw new Error(`API error: ${data.status.error_message}`);
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
          structuredContent: {
            cryptocurrencies: data.data.data,
            pagination: data.data.pagination,
            timestamp: data.status.timestamp,
          },
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        return {
          content: [
            {
              type: "text",
              text: `Error fetching cryptocurrency market data: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
});

export const GET = handler;
export const POST = handler;
