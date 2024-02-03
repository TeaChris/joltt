import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { constructMetadata } from '@/lib/matadata'

import { Toaster } from 'sonner'

import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

import '@/styles/globals.css'
import '@uploadthing/react/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

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
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  )
}
