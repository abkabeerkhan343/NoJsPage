import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoMart - Sustainable Shopping Made Simple',
  description: 'Discover eco-friendly products for your home, personal care, and lifestyle. Shop sustainable goods with fast delivery and competitive prices.',
  openGraph: {
    title: 'EcoMart - Sustainable Shopping Made Simple',
    description: 'Discover eco-friendly products for your home, personal care, and lifestyle.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "EcoMart",
              "description": "Sustainable Shopping Made Simple",
              "url": "https://ecomart.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://ecomart.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Progressive enhancement - add 'js' class when JavaScript is available
              document.documentElement.classList.add('js');
            `
          }}
        />
      </body>
    </html>
  )
}
