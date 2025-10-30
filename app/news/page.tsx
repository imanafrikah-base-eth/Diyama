export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">News</h1>
        <p className="mt-2 text-slate-300">Curated updates from verified sources.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h3 className="font-medium text-slate-200">Headline #{i}</h3>
              <p className="text-sm text-slate-400">Source and summary.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}