import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from '@/components/providers/provider'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ReduxProvider><body>{children}</body></ReduxProvider>
    </html>
  )
}
