'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { Suspense, useState } from 'react'

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
  const basePath = pathname
    .replace(/^\/|\/page\/\d+\/?$|\/$/g, '')

  // Helper to generate page numbers with ellipsis
  function getPageNumbers(): (string | number)[] {
    const pages: (string | number)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }
  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2">
      {/* Prev Button */}
      <Link
        href={`/${basePath}${currentPage - 1 === 1 ? '' : `/page/${currentPage - 1}`}`}
        className={`rounded-full px-4 py-2 font-bold transition-colors ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-pink-500 text-white hover:bg-pink-600'}`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        &larr; Prev
      </Link>
      {/* Page Numbers */}
      {pageNumbers.map((num, idx) =>
        num === '...'
          ? <span key={`ellipsis-${idx}`} className="px-2 text-xl text-gray-400">...</span>
          : <Link
              key={`page-${num}`}
              href={`/${basePath}${num === 1 ? '' : `/page/${num}`}`}
              className={`rounded-full px-4 py-2 font-bold transition-colors ${num === currentPage ? 'bg-pink-600 text-white' : 'bg-pink-200 text-pink-600 hover:bg-pink-400'}`}
              aria-current={num === currentPage ? 'page' : undefined}
            >
              {num}
            </Link>
      )}
      {/* Next Button */}
      <Link
        href={`/${basePath}/page/${currentPage + 1}`}
        className={`rounded-full px-4 py-2 font-bold transition-colors ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-pink-500 text-white hover:bg-pink-600'}`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        Next &rarr;
      </Link>
    </nav>
  )
}

function ActualListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
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

  // Filter posts by search value (title, summary, tags)
  const filteredPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + (post.tags?.join(' ') || '')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const displayPosts = initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredPosts

  return (
    <>
      <div className="relative">
        {/* Floating Search Bar */}
        <div className="fixed left-1/2 top-8 z-50 w-full max-w-xl -translate-x-1/2 rounded-2xl bg-white/90 p-4 shadow-2xl dark:bg-gray-900/90">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by title, summary, or tag..."
            className="w-full rounded-xl border border-pink-300 bg-white px-6 py-3 text-lg text-pink-700 shadow focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:bg-gray-900 dark:text-pink-200"
          />
        </div>
        <div className="pt-28 pb-6 text-center">
          <h1 className="text-gradient-factlink-custom mb-8 text-4xl font-extrabold md:text-6xl">
            {title}
          </h1>
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
              <div className="flex items-center gap-2">
                <label htmlFor="pageSize" className="text-gradient-factlink-custom text-lg font-bold">Blogs per page:</label>
                <div className="relative">
                  <select
                    id="pageSize"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="appearance-none rounded-full border border-pink-400 bg-white/80 px-6 py-2 pr-10 text-base font-semibold text-pink-600 shadow transition-colors focus:border-pink-600 focus:ring-2 focus:ring-pink-200 dark:bg-gray-900/80 dark:text-pink-300"
                  >
                    {[5, 10, 20, 50].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-pink-400 dark:text-pink-300">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M7 10l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          )}
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
      </div>
    </>
  )
}

export default function ListLayoutWithTags(props: ListLayoutProps) {
  return (
    <Suspense>
      <ActualListLayoutWithTags {...props} />
    </Suspense>
  )
}
