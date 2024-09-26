import { yekanBakh } from '@/styles/fonts/fonts'
import '@/styles/globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${yekanBakh.className}`}>{children}</body>
    </html>
  )
}
