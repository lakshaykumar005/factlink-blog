// app/[...slug]/layout.tsx
import { Metadata } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

interface BlogLayoutProps {
  children: React.ReactNode
  params: { slug: string[] }
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slug = params.slug.join('/')
  const post = allBlogs.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set('title', post.title)
  ogSearchParams.set('summary', post.summary || '')
  if (post.images && post.images.length > 0) {
    ogSearchParams.set('image', post.images[0])
  }

  return {
    title: post.title,
    description: post.summary || 'Read this blog post on Factlink',
    authors: post.authors ? post.authors.map((author) => ({ name: author })) : [{ name: 'Factlink Team' }],
    openGraph: {
      title: post.title,
      description: post.summary || 'Read this blog post on Factlink',
      type: 'article',
      publishedTime: post.date,
      url: `https://factlink-blog.vercel.app/${slug}`,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || 'Read this blog post on Factlink',
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  }
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>
}