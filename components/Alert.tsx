import clsx from "clsx";

export default function Alert({ type = "info", message }: { type?: "info" | "success" | "error"; message: string }) {
  const styles = {
    info: "bg-slate-800 text-slate-200 border-slate-700",
    success: "bg-emerald-800/40 text-emerald-100 border-emerald-600/60",
    error: "bg-red-900/40 text-red-200 border-red-600/60",
  }[type];
  return (
    <div className={clsx("rounded-md border px-3 py-2 text-sm", styles)}>
      {message}
    </div>
  );
}