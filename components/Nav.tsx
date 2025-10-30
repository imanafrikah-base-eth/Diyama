"use client";
import Link from "next/link";
import { useState } from "react";
import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { Identity, Avatar, Name, Address, EthBalance } from "@coinbase/onchainkit/identity";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/wallet", label: "Wallet/Exchange" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/news", label: "News" },
    { href: "/learn", label: "Learn" },
    { href: "/community", label: "Community" },
    { href: "/mint", label: "Mint" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-100 font-semibold tracking-wide">Diyama</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                prefetch={false}
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-md text-sm text-slate-200 hover:text-white hover:bg-slate-800/60 transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex">
              <Wallet>
                <ConnectWallet className="px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-tr from-indigo-600 via-sky-500 to-cyan-400 text-white shadow-sm hover:opacity-90 transition">
                  <Avatar className="h-5 w-5" />
                  <Name />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:bg-slate-800/60"
              aria-label="Toggle Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-800 bg-black/50">
          <div className="px-4 py-3 grid grid-cols-1 gap-1">
            {links.map((l) => (
              <Link
                prefetch={false}
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-md text-sm text-slate-200 hover:text-white hover:bg-slate-800/60 transition"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2">
              <Wallet>
                <ConnectWallet className="w-full justify-center px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-tr from-indigo-600 via-sky-500 to-cyan-400 text-white shadow-sm hover:opacity-90 transition">
                  <Avatar className="h-5 w-5" />
                  <Name />
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}