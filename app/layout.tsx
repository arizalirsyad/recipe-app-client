import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header' // <-- 1. Impor

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Recipe App',
  description: 'A simple recipe app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header /> {/* <-- 2. Letakkan di sini */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}