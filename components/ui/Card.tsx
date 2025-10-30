import { ReactNode } from "react";
import clsx from "clsx";

export default function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-xl border border-slate-800 bg-slate-900/50 shadow-sm", className)}>
      {children}
    </div>
  );
}