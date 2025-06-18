'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex items-center justify-center gap-8">
        {!prevPage && (
          <button className="cursor-auto rounded-full bg-pink-200 px-8 py-4 text-lg font-extrabold text-pink-500 shadow-lg disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="rounded-full bg-pink-500 px-8 py-4 text-lg font-extrabold text-white shadow-lg transition-colors hover:bg-pink-600"
          >
            Previous
          </Link>
        )}
        <span className="text-lg font-bold text-black dark:text-white">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto rounded-full bg-pink-200 px-8 py-4 text-lg font-extrabold text-pink-500 shadow-lg disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next" className="rounded-full bg-pink-500 px-8 py-4 text-lg font-extrabold text-white shadow-lg transition-colors hover:bg-pink-600">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  // Compute tag counts dynamically from posts
  const tagCounts: Record<string, number> = {}
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pt-6 pb-6 text-center">
          <h1 className="mb-8 text-4xl font-extrabold text-gradient-factlink-custom md:text-6xl">
            {title}
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post
            return (
              <div
                key={path}
                className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-xl transition-transform hover:scale-105 dark:border-gray-800 dark:bg-gray-900/80"
              >
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
                    <Link href={`/${path}`}>{title}</Link>
                  </h2>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-black dark:bg-gray-800 dark:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">{summary}</p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(date, siteMetadata.locale)}
                  </span>
                  <Link
                    href={`/${path}`}
                    className="rounded-full bg-pink-500 px-4 py-2 font-bold text-white shadow transition-colors hover:bg-pink-600"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          </div>
        )}
      </div>
    </>
  )
}
