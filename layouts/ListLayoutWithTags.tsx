'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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

function Pagination({ totalPages, currentPage }) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex items-center justify-center gap-2 flex-wrap">
        {pageNumbers.map((num) => (
          <Link
            key={num}
            href={`/${basePath}${num === 1 ? '' : `/page/${num}`}`}
            className={`px-4 py-2 rounded-full font-bold transition-colors ${num === currentPage ? 'bg-pink-600 text-white' : 'bg-pink-200 text-pink-600 hover:bg-pink-400'}`}
            aria-current={num === currentPage ? 'page' : undefined}
          >
            {num}
          </Link>
        ))}
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
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageSize = parseInt(searchParams.get('pageSize') || '5')
  const handlePageSizeChange = (e) => {
    const newSize = e.target.value
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set('pageSize', newSize)
    router.replace(`?${params.toString()}`)
  }
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
          <div className="mb-6 flex justify-center items-center gap-2">
            <label htmlFor="pageSize" className="font-bold text-lg text-gradient-factlink-custom mr-2">Blogs per page:</label>
            <div className="relative">
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="appearance-none rounded-full border border-pink-400 bg-white/80 dark:bg-gray-900/80 px-6 py-2 pr-10 text-base font-semibold text-pink-600 dark:text-pink-300 shadow focus:border-pink-600 focus:ring-2 focus:ring-pink-200 transition-colors"
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 dark:text-pink-300">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>
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
