export default function MintPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Mint</h1>
        <p className="mt-2 text-slate-300">Create and publish NFTs with guided steps.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="font-medium text-slate-200">Asset</h2>
            <p className="text-sm text-slate-400">Upload and configure metadata.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="font-medium text-slate-200">Publish</h2>
            <p className="text-sm text-slate-400">Deploy and share your mint.</p>
          </div>
        </div>
      </section>
    </main>
  );
}