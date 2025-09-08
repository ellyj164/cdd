import './globals.css'
import './i18n-init'
import { Providers } from './providers'
import { HeaderWrapper } from './components/HeaderWrapper'
import { FooterWrapper } from './components/FooterWrapper'

export const metadata = {
  title: 'Global Nexus Professional Ecommerce Platform',
  description: 'Enterprise-level marketplace with advanced AI-driven personalization, AR experiences, and blockchain verification',
  keywords: ['ecommerce', 'marketplace', 'AI', 'blockchain', 'AR', 'enterprise'],
  authors: [{ name: 'Global Nexus Team' }],
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <Providers>
          <HeaderWrapper />
          <main className="flex-1">
            {children}
          </main>
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  )
}