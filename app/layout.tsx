import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

import '@uploadthing/react/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            'relative h-full font-sans antialiased',
            inter.className
          )}
        >
          <div className=""> {children}</div>
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </SessionProvider>
  )
}
