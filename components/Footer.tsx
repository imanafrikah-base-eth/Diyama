export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-800 bg-black/30">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Diyama. All rights reserved.</span>
        <span className="flex items-center gap-3">
          <a href="/community" className="hover:text-slate-200">Community</a>
          <a href="/news" className="hover:text-slate-200">News</a>
          <a href="/learn" className="hover:text-slate-200">Learn</a>
        </span>
      </div>
    </footer>
  );
}