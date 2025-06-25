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

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [`${siteMetadata.siteUrl}/static/images/factlinkproject.png`],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
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
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [`${siteMetadata.siteUrl}/static/images/factlinkproject.png`],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html lang={siteMetadata.language} className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Open Graph / Facebook / WhatsApp / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Factlink & Polymarket Blog" />
        <meta
          property="og:description"
          content="Insights, updates, and research on Factlink, Polymarket, and blockchain technology."
        />
        <meta property="og:url" content="https://factlink-blog.vercel.app" />
        <meta
          property="og:image"
          content="https://factlink-blog.vercel.app/static/images/factlinkproject.png"
        />
        <meta property="og:image:alt" content="Factlink Project" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Factlink & Polymarket Blog" />
        <meta
          name="twitter:description"
          content="Insights, updates, and research on Factlink, Polymarket, and blockchain technology."
        />
        <meta name="twitter:url" content="https://factlink-blog.vercel.app" />
        <meta
          name="twitter:image"
          content="https://factlink-blog.vercel.app/static/images/factlinkproject.png"
        />
        {/* Telegram */}
        <meta
          name="telegram:image"
          content="https://factlink-blog.vercel.app/static/images/factlinkproject.png"
        />
        {/* Discord */}
        <meta
          name="discord:image"
          content="https://factlink-blog.vercel.app/static/images/factlinkproject.png"
        />
        {/* Instagram (uses Open Graph) */}
        {/* Pinterest (uses Open Graph) */}
      </head>
      <link rel="apple-touch-icon" sizes="76x76" href="/static/images/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon.ico" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico" />
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
