import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Card from '@/components/Card'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import BackToTopBlogButton from '@/components/BackToTopBlogButton'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, images } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          {/* Featured Image Card at the top */}
          {images?.[0] && (
            <div className="mb-12 flex flex-col items-stretch justify-center gap-8 md:flex-row">
              <div className="flex flex-1 items-center justify-center">
                <Image
                  src={images[0]}
                  alt={title}
                  width={400}
                  height={220}
                  className="mx-auto h-[220px] w-[400px] rounded-2xl border border-gray-200 bg-white object-cover object-center shadow-xl dark:border-gray-800 dark:bg-gray-900"
                  priority
                />
              </div>
            </div>
          )}
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
                {tags && (
                  <div className="mt-4 mb-2 flex flex-wrap justify-center gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white transition hover:scale-105 hover:bg-pink-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </header>
          <hr className="my-8 border-t border-gray-400 dark:border-gray-700" />
          <div className="prose dark:prose-invert mx-auto max-w-none pt-10 pb-8">{children}</div>
        </div>
        <hr className="my-8 border-t border-gray-400 dark:border-gray-700" />
        {/* Related Articles Section */}
        <SuggestedArticles currentSlug={slug} currentTags={tags} />
        <hr className="my-8 border-t border-gray-400 dark:border-gray-700" />
        {/* Footer: Back to Top */}
        <div className="flex justify-center pt-16 pb-8">
          <BackToTopBlogButton />
        </div>
      </article>
    </SectionContainer>
  )
}

function SuggestedArticles({ currentSlug, currentTags }) {
  // Get all posts except the current one
  const posts = allCoreContent(allBlogs).filter((post) => post.slug !== currentSlug)
  // Find posts with at least one matching tag
  const suggestions = posts
    .filter((post) => post.tags?.some((tag) => currentTags.includes(tag)))
    .slice(0, 3)
  if (suggestions.length === 0) return null
  return (
    <div className="pt-10">
      <h2 className="text-gradient-factlink-custom mb-8 text-left text-2xl font-bold md:text-center md:text-3xl">
        Related Articles
      </h2>
      <div className="hide-scrollbar flex flex-row flex-nowrap gap-4 overflow-x-auto px-1 pb-4 sm:gap-8 sm:px-2">
        {suggestions.map((post) => (
          <div
            className="mx-auto flex w-[85vw] max-w-xs flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg sm:w-[320px] md:w-[360px] dark:border-gray-700 dark:bg-gray-900"
            key={post.slug}
          >
            <Link href={`/${post.slug}`} className="block h-40 w-full overflow-hidden sm:h-48">
              <Image
                src={post.images?.[0] || '/static/images/topic.png'}
                alt={post.title}
                width={360}
                height={180}
                className="h-40 w-full object-cover object-center transition-transform duration-300 hover:scale-105 sm:h-48"
              />
            </Link>
            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <div className="mb-2 text-xs font-medium text-gray-400">
                {post.date &&
                  new Date(post.date).toLocaleDateString(siteMetadata.locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                {post.readingTime && <> • {post.readingTime.text}</>}
              </div>
              <h3 className="mb-2 text-base font-bold text-black sm:text-lg dark:text-white">
                <Link
                  href={`/${post.slug}`}
                  className="text-black transition-colors hover:text-pink-400 dark:text-white"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mb-4 line-clamp-3 text-xs text-black sm:text-sm dark:text-white">
                {post.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
