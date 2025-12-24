type McpRequestCardProps = {
  requestId?: string;
  toolName: string;
  method?: string;
  path?: string;
  status?: "pending" | "success" | "error";
  createdAt?: string;
  durationMs?: number;
  input?: Record<string, unknown> | string | null;
};

const statusStyles: Record<NonNullable<McpRequestCardProps["status"]>, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
  error: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
};

function formatInput(input: McpRequestCardProps["input"]) {
  if (input == null) {
    return "No input payload.";
  }
  if (typeof input === "string") {
    return input;
  }
  return JSON.stringify(input, null, 2);
}

export default function McpRequestCard({
  requestId,
  toolName,
  method = "POST",
  path = "/mcp",
  status = "pending",
  createdAt,
  durationMs,
  input,
}: McpRequestCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-lg p-6 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          MCP Request
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
          {status}
        </span>
        {requestId ? (
          <span className="text-xs text-slate-400">ID {requestId}</span>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{toolName}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {method} {path}
            {createdAt ? ` · ${createdAt}` : ""}
          </p>
        </div>
        {typeof durationMs === "number" ? (
          <div className="text-right text-sm text-slate-500 dark:text-slate-400">
            {durationMs} ms
          </div>
        ) : null}
      </div>

      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Input Payload
        </h3>
        <pre className="text-xs leading-relaxed whitespace-pre-wrap text-slate-600 dark:text-slate-300">
          {formatInput(input)}
        </pre>
      </div>
    </section>
  );
}
