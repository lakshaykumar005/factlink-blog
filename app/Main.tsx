'use client'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import CustomNewsletterForm from '@/components/CustomNewsletterForm'
import { useState } from 'react'
import BackToTopButton from '@/components/BackToTopButton'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [searchValue, setSearchValue] = useState('')
  const totalPages = Math.ceil(
    posts.filter((post) => {
      const searchContent = post.title + post.summary + (post.tags?.join(' ') || '')
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    }).length / pageSize
  )
  const filteredPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + (post.tags?.join(' ') || '')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const paginatedPosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-gradient-factlink-custom mb-6 text-5xl font-extrabold text-black md:text-7xl dark:text-white">
          Factlink Insights
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-700 md:text-xl dark:text-gray-200">
          Explore the latest research, updates, and thought leadership on Factlink, Polymarket, and
          the future of decentralized finance. Dive into articles about blockchain technology,
          prediction markets, oracles, and more.
        </p>
      </section>

      {/* Blogs per page dropdown below hero description */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <label htmlFor="pageSize" className="text-gradient-factlink-custom text-lg font-bold">
          Blogs per page:
        </label>
        <div className="relative">
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPage(1)
            }}
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

      {/* Blog List */}
      <section className="mx-auto max-w-3xl px-4 pt-8">
        {!posts.length && <div className="text-center text-gray-500">No posts found.</div>}
        <ul className="space-y-12">
          {paginatedPosts.map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="">
                <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900">
                  <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(date, siteMetadata.locale)}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-black md:text-3xl dark:text-white">
                    <Link href={`/blog/${slug}`}>{title}</Link>
                  </h2>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">{summary}</p>
                  <Link
                    href={`/blog/${slug}`}
                    className="inline-block font-semibold text-pink-500 transition-colors hover:underline"
                    aria-label={`Read more: "${title}"`}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            {/* Pagination */}
            <nav className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`rounded-full px-4 py-2 font-bold transition-colors ${page === 1 ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-pink-500 text-white hover:bg-pink-600'}`}
              >
                &larr; Prev
              </button>
              {/* Page Numbers with ellipsis */}
              {(() => {
                const pages: (string | number)[] = []
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i)
                } else {
                  if (page <= 4) {
                    pages.push(1, 2, 3, 4, 5, '...', totalPages)
                  } else if (page >= totalPages - 3) {
                    pages.push(
                      1,
                      '...',
                      totalPages - 4,
                      totalPages - 3,
                      totalPages - 2,
                      totalPages - 1,
                      totalPages
                    )
                  } else {
                    pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
                  }
                }
                return pages.map((num, idx) =>
                  num === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-xl text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={`page-${num}`}
                      onClick={() => setPage(Number(num))}
                      className={`rounded-full px-4 py-2 font-bold transition-colors ${num === page ? 'bg-pink-600 text-white' : 'bg-pink-200 text-pink-600 hover:bg-pink-400'}`}
                      aria-current={num === page ? 'page' : undefined}
                    >
                      {num}
                    </button>
                  )
                )
              })()}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`rounded-full px-4 py-2 font-bold transition-colors ${page === totalPages ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-pink-500 text-white hover:bg-pink-600'}`}
              >
                Next &rarr;
              </button>
            </nav>
          </div>
        )}
      </section>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-8">
          <CustomNewsletterForm />
        </div>
      )}
      <div className="mt-8 mb-16 flex justify-center">
        <BackToTopButton />
      </div>
    </>
  )
}
