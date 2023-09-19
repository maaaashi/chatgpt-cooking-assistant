import { RecoilRootComponent } from '@/components/RecoilRoot'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
    <html lang='en' data-theme="cupcake">
      <body className={inter.className}>
        <RecoilRootComponent>{children}</RecoilRootComponent>
      </body>
    </html>
  )
}
