import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dark Factory v3 — Agentic Build Factory',
  description: 'Build Me A Dashboard. AI-powered SaaS from idea to deployment. Powered by gstack + Cursor agents on Ogre VMs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}