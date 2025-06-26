// app/layout.tsx
import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import CustomSearchProvider from '@/components/CustomSearchProvider'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'

// Base metadata for the root layout
export const metadata: Metadata = {
  metadataBase: new URL('https://factlink-blog.vercel.app'),
  title: {
    default: 'Factlink - Decentralized Optimistic Oracle for Solana',
    template: `%s | Factlink`,
  },
  description:
    'Factlink is an optimistic oracle that trustlessly records any verifiable data on the Solana blockchain.',

  // Default Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://factlink-blog.vercel.app',
    title: 'Factlink - Decentralized Optimistic Oracle for Solana',
    description:
      'Factlink is an optimistic oracle that trustlessly records any verifiable data on the Solana blockchain.',
    siteName: 'Factlink',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Factlink - Decentralized Optimistic Oracle for Solana',
      },
    ],
  },

  // Default Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Factlink - Decentralized Optimistic Oracle for Solana',
    description:
      'Factlink is an optimistic oracle that trustlessly records any verifiable data on the Solana blockchain.',
    site: '@factlinkoracle',
    creator: '@factlinkoracle',
    images: ['/api/og'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://factlink-blog.vercel.app',
    types: {
      'application/rss+xml': 'https://factlink-blog.vercel.app/feed.xml',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="76x76" href="/static/images/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon.ico" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </head>
      <body className="bg-gradient-to-br from-gray-50 via-blue-50 to-teal-100 pl-[calc(100vw-100%)] text-black antialiased dark:bg-black dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <CustomSearchProvider>
              <Header />
              <main className="mb-auto">{children}</main>
            </CustomSearchProvider>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
