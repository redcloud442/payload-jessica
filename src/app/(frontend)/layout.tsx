import React, { ReactNode } from 'react'
import '@/styles/global.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'

type LayoutProps = {
  children: ReactNode
}

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={cn('bg-background antialiased', fontSans.variable)}>
      <body className="min-h-screen bg-background antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
