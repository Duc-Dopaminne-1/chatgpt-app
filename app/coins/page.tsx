"use client";

import { useMemo, useState } from "react";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import McpRequestCard from "../mcp/McpRequestCard";

type Coin = {
  id: string;
  symbol: string;
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
};

type RequestStatus = "idle" | "loading" | "success" | "error";

const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 4,
});

export default function CoinsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [requestedAt, setRequestedAt] = useState<string | null>(null);

  const requestStatus = useMemo(() => {
    if (status === "loading") return "pending";
    if (status === "success") return "success";
    if (status === "error") return "error";
    return "pending";
  }, [status]);

  const handleFetch = async () => {
    setStatus("loading");
    setError(null);
    setDurationMs(null);
    setRequestedAt(new Date().toLocaleString());

    const startedAt = performance.now();
    const client = new Client({ name: "mcp-ui", version: "1.0.0" });
    const transport = new StreamableHTTPClientTransport(
      new URL("/mcp", window.location.origin)
    );

    try {
      await client.connect(transport);
      const result = await client.callTool({
        name: "get_crypto_market_data",
        arguments: query ? { query } : {},
      });

      if (result.isError) {
        throw new Error("MCP tool returned an error.");
      }

      const structured = result.structuredContent as
        | { cryptocurrencies?: Coin[] }
        | undefined;

      if (!structured?.cryptocurrencies) {
        throw new Error("No cryptocurrency data returned.");
      }

      setCoins(structured.cryptocurrencies);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setStatus("error");
    } finally {
      setDurationMs(Math.round(performance.now() - startedAt));
      await transport.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            MCP Crypto Market
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Call the MCP tool to fetch live market data and list the coins.
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label
                htmlFor="query"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Optional query
              </label>
              <input
                id="query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. top 20 by RSI"
                className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleFetch}
              disabled={status === "loading"}
              className="rounded-xl bg-blue-600 text-white px-6 py-3 text-sm font-semibold shadow hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Loading..." : "Fetch coins"}
            </button>
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          ) : null}
        </div>

        <McpRequestCard
          toolName="get_crypto_market_data"
          status={requestStatus}
          method="POST"
          path="/mcp"
          durationMs={durationMs ?? undefined}
          input={query ? { query } : null}
          createdAt={requestedAt ?? undefined}
        />

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Coins
            </h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {coins.length} results
            </span>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {coins.slice(0, 50).map((coin) => (
              <div key={coin.id} className="py-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {coin.rank}. {coin.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {coin.symbol} · RSI 4h {number.format(coin.rsi.rsi4h)}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div>
                    <p className="text-xs uppercase text-slate-400">Price</p>
                    <p>{currency.format(coin.price)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-slate-400">24h</p>
                    <p>{number.format(coin.price24h)}%</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-slate-400">Mkt Cap</p>
                    <p>{number.format(coin.marketCap)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-slate-400">Volume</p>
                    <p>{number.format(coin.volume24h)}</p>
                  </div>
                </div>
              </div>
            ))}
            {coins.length === 0 ? (
              <div className="py-8 text-center text-slate-500 dark:text-slate-400">
                No data yet. Click "Fetch coins" to load the list.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
