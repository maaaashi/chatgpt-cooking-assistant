import { RecoilRootComponent } from '@/components/RecoilRoot'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatGPT Cooking Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body
        className={`${inter.className} h-screen flex flex-col overflow-y-hidden`}
      >
        <RecoilRootComponent>
          <Header />
          {children}
        </RecoilRootComponent>
      </body>
    </html>
  )
}
