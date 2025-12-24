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

const WIDGET_RESOURCE_URI = "mcp://crypto-market-widget";

function buildWidgetHtml(
  cryptocurrencies: CoinMarketCapResponse["data"]["data"]
) {
  const formatNumber = (value: number | null | undefined, digits = 2) => {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return "n/a";
    }
    return value.toFixed(digits);
  };

  const rows = cryptocurrencies.slice(0, 30).map((coin) => {
    const price = formatNumber(coin.price, 4);
    const rsi4h = formatNumber(coin.rsi?.rsi4h, 2);
    const change = formatNumber(coin.price24h, 2);
    return `
      <tr>
        <td>${coin.rank}</td>
        <td>
          <div class="name">${coin.name}</div>
          <div class="symbol">${coin.symbol}</div>
        </td>
        <td>$${price}</td>
        <td>${change}%</td>
        <td>${rsi4h}</td>
      </tr>
    `;
  });

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Crypto Market Widget</title>
        <style>
          :root {
            color-scheme: light;
            --bg: #0f172a;
            --card: #111827;
            --text: #e2e8f0;
            --muted: #94a3b8;
            --accent: #38bdf8;
            --border: #1f2937;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: var(--text);
            padding: 24px;
          }
          .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 20px 40px rgba(15, 23, 42, 0.45);
          }
          h1 {
            margin: 0 0 6px;
            font-size: 20px;
            letter-spacing: 0.4px;
          }
          p {
            margin: 0 0 16px;
            color: var(--muted);
            font-size: 13px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th, td {
            text-align: left;
            padding: 10px 6px;
            border-bottom: 1px solid var(--border);
          }
          th {
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 11px;
            color: var(--muted);
          }
          .name {
            font-weight: 600;
            color: var(--text);
          }
          .symbol {
            color: var(--muted);
            font-size: 12px;
          }
          .footer {
            margin-top: 12px;
            font-size: 12px;
            color: var(--muted);
          }
        </style>
        <script>
    async function sendMessage() {
      const response = await fetch(
        "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/rsi/heatmap/table?limit=500&page=1&volume24hRange.min=1000000&marketCapRange.min=50000000&sort=rsi4h&ascendingOrder=false"
      );


      const data = await response.json();
      console.log("Success:", data);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
          sendMessage().catch(console.error);
        }, 400);
      });
    } else {
      sendMessage().catch(console.error);
    }
  </script>

      </head>
      <body>
        <div class="card">
          <h1>Crypto Market Snapshot</h1>
          <p>Top coins by RSI 4h (live from CoinMarketCap)</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>24h</th>
                <th>RSI 4h</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join("")}
            </tbody>
          </table>
          <div class="footer">Showing 30 coins.</div>
        </div>
      </body>
    </html>
  `;
}



const handler = createMcpHandler(async (server) => {
  server.registerResource(
    "crypto_market_widget",
    WIDGET_RESOURCE_URI,
    {
      title: "Crypto Market Widget",
      description: "Renders a compact list of top cryptocurrencies.",
      mimeType: "text/html",
    },
    async () => {
      const response = await fetch(COINMARKETCAP_API_URL);

      if (!response.ok) {
        return {
          contents: [
            {
              uri: WIDGET_RESOURCE_URI,
              mimeType: "text/plain",
              text: `Widget error: ${response.status} ${response.statusText}`,
            },
          ],
        };
      }

      const data: CoinMarketCapResponse = await response.json();
      const html = buildWidgetHtml(data.data.data);

      return {
        contents: [
          {
            uri: WIDGET_RESOURCE_URI,
            mimeType: "text/html",
            text: html,
          },
        ],
      };
    }
  );

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
        "openai/resultCanProduceWidget": true,
        "openai/outputTemplate": WIDGET_RESOURCE_URI,
        "openai/widgetAccessible": true,
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
          _meta: {
            "openai/outputTemplate": WIDGET_RESOURCE_URI,
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
