import { Wallet } from "@coinbase/onchainkit/wallet";
import { Identity, Avatar, Name, Address, EthBalance } from "@coinbase/onchainkit/identity";
import ExchangeForm from "../../components/ExchangeForm";

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Wallet & Exchange</h1>
        <p className="mt-2 text-slate-300">Manage Base wallet and submit P2P USDC→Kwacha requests.</p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="font-medium text-slate-200">Wallet Overview</h2>
            <div className="mt-3">
              <Wallet>
                <Identity className="px-2 pt-2 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
              </Wallet>
            </div>
          </div>
          <ExchangeForm />
        </div>
      </section>
    </main>
  );
}