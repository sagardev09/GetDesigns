import { Inter } from 'next/font/google'
import './globals.css'
import GlobalProvider from './utils/GlobalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalProvider>
        <body className={inter.className}>{children}</body>
      </GlobalProvider>
    </html>
  )
}
