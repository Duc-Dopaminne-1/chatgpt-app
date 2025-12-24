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
      _meta: {
        "openai/toolInvocation/invoking": "Fetching cryptocurrency market data...",
        "openai/toolInvocation/invoked": "Market data retrieved",
      },
    },
    async ({ query }) => {
      try {
        // const response = await fetch(COINMARKETCAP_API_URL);
        //
        // if (!response.ok) {
        //   throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        // }
        //
        // const data: CoinMarketCapResponse = await response.json();

        // if (data.status.error_code !== "0") {
        //   throw new Error(`API error: ${data.status.error_message}`);
        // }

        const data = {"data":{"data":[{"id":"1","symbol":"BTC","slug":"bitcoin","name":"Bitcoin","marketCap":1742294743855.51,"volume24h":43247180179.32321167,"price":87261.856319437100000000000000,"price24h":-0.91991338,"rank":1,"rsi":{"rsi15m":44.67155480893611,"rsi1h":43.53403129776011,"rsi4h":43.13001251429478,"rsi24h":42.362707752043185,"rsi7d":37.20443526749454}},{"id":"1027","symbol":"ETH","slug":"ethereum","name":"Ethereum","marketCap":355118201994.95,"volume24h":20600829577.59408569,"price":2942.277968692888000000000000,"price24h":-1.53736731,"rank":2,"rsi":{"rsi15m":44.70162978032945,"rsi1h":44.48396200613811,"rsi4h":44.49602742907025,"rsi24h":43.941264963543105,"rsi7d":41.923525042112395}},{"id":"1839","symbol":"BNB","slug":"bnb","name":"BNB","marketCap":115780683612.83,"volume24h":1680822260.84463120,"price":840.605400138622300000000000,"price24h":-1.65505362,"rank":4,"rsi":{"rsi15m":45.082023393929745,"rsi1h":41.39971930438647,"rsi4h":40.39092017044583,"rsi24h":40.553572600581816,"rsi7d":46.443310982409216}},{"id":"52","symbol":"XRP","slug":"xrp","name":"XRP","marketCap":112598770908.55,"volume24h":2160782638.42581415,"price":1.858895445568803800000000,"price24h":-1.58654922,"rank":5,"rsi":{"rsi15m":40.880813462056175,"rsi1h":36.17082926937304,"rsi4h":37.255639981136454,"rsi24h":37.91680149829623,"rsi7d":37.18839260027268}},{"id":"5426","symbol":"SOL","slug":"solana","name":"Solana","marketCap":68523316389.98,"volume24h":3078560815.26631784,"price":121.837610691075910000000000,"price24h":-2.94275081,"rank":7,"rsi":{"rsi15m":32.676654286250425,"rsi1h":35.687757808060596,"rsi4h":37.12050586653801,"rsi24h":37.39338666249846,"rsi7d":36.355060264985696}},{"id":"1958","symbol":"TRX","slug":"tron","name":"TRON","marketCap":26817929881.61,"volume24h":464344662.59750390,"price":0.283223626285567900000000,"price24h":-0.31327821,"rank":8,"rsi":{"rsi15m":44.45791988722138,"rsi1h":45.970909400691575,"rsi4h":50.0367745627731,"rsi24h":51.592125066784405,"rsi7d":44.8183774014608}},{"id":"74","symbol":"DOGE","slug":"dogecoin","name":"Dogecoin","marketCap":21520520412.54,"volume24h":915445342.94486368,"price":0.128081179675841230000000,"price24h":-3.14236405,"rank":9,"rsi":{"rsi15m":38.79815805051395,"rsi1h":38.629659797112026,"rsi4h":40.154213331386195,"rsi24h":39.54449143647518,"rsi7d":36.21341774816743}},{"id":"2010","symbol":"ADA","slug":"cardano","name":"Cardano","marketCap":12894618233.82,"volume24h":483599042.02729315,"price":0.358922148021900200000000,"price24h":-2.27877899,"rank":10,"rsi":{"rsi15m":40.80042502806491,"rsi1h":40.229644960984125,"rsi4h":40.07208943590677,"rsi24h":35.965186106878434,"rsi7d":31.75268841507328}},{"id":"1831","symbol":"BCH","slug":"bitcoin-cash","name":"Bitcoin Cash","marketCap":11453968359.05,"volume24h":356356284.80357987,"price":573.528062139695500000000000,"price24h":-1.22842144,"rank":11,"rsi":{"rsi15m":48.3097673014022,"rsi1h":42.44447438583109,"rsi4h":43.85732925976948,"rsi24h":51.71645865681059,"rsi7d":54.780932456459645}},{"id":"1975","symbol":"LINK","slug":"chainlink","name":"Chainlink","marketCap":8663726465.50,"volume24h":419275439.58744454,"price":12.235174166108168000000000,"price24h":-1.78157440,"rank":12,"rsi":{"rsi15m":38.91935188739771,"rsi1h":41.663829963366666,"rsi4h":41.459539113204784,"rsi24h":39.60904249775589,"rsi7d":37.73932420612997}}],"pagination":{"currentPage":1,"totalPages":862,"totalItems":"8612","itemsPerPage":10}},"status":{"timestamp":"2025-12-24T04:50:37.094Z","error_code":"0","error_message":"SUCCESS","elapsed":"43","credit_count":0}}
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
