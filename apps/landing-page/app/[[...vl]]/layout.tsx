import type { Metadata } from 'next'
import localFont from 'next/font/local'

import '../globals.css'

const vodafone = localFont({
  src: '../assets/fonts/VodafoneLt.woff',
  variable: '--font-vodafone',
})

export const metadata: Metadata = {
  title: 'Vodafone Insurance - Landing Page POC',
  description: 'It\'s just a POC, keep your pants on',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={vodafone.variable} lang="en">
      <body>{children}</body>
    </html>
  )
}
