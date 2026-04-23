import type { Metadata } from 'next'
import { Rye, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/* ── Decorative display: western circus headings ── */
const rye = Rye({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

/* ── UI body: clean geometric sans ── */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Circorotos | Vive la Magia del Circo',
  description: 'Descubre el mundo mágico del circo. Espectáculos en vivo, arte circense y experiencias inolvidables.',
  keywords: ['circo', 'espectáculos', 'arte circense', 'entretenimiento', 'circorotos'],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${rye.variable} ${poppins.variable}`}>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
