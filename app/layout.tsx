import './globals.css';
import '@coinbase/onchainkit/styles.css';
import BottomNavigation from "../components/BottomNavigation";
import PageTransition from "../components/PageTransition";
import ErrorBoundary from "../components/ErrorBoundary";
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
      <body className="min-h-screen bg-black text-white">
        <ErrorBoundary>
          <Providers>
            <PageTransition>
              {children}
            </PageTransition>
            <BottomNavigation />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
