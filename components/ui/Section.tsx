import { ReactNode } from "react";

export default function Section({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
        {description ? <p className="text-slate-300 text-sm">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}