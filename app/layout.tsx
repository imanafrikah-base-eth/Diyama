import './globals.css';
import '@coinbase/onchainkit/styles.css';
import Nav from "../components/Nav";
import { Providers } from "./providers";

export const metadata = {
  title: 'Diyama App',
  description: 'Mobile-first Onchain onboarding for creators on Base',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  )
}
