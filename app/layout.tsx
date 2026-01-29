import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Screenshot to Code - AI-Powered UI Generator',
  description: 'Convert any screenshot or design mockup into clean, production-ready code instantly using AI',
  keywords: ['screenshot to code', 'figma to code', 'design to code', 'AI code generator'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
