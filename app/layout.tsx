import './globals.css';

export const metadata = {
  title: 'DIYAMA Admin',
  description: 'Mobile-optimized admin dashboard with blue branding',
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
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
