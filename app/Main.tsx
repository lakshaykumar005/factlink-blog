'use client'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import CustomNewsletterForm from '@/components/CustomNewsletterForm'
import { useState } from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import Image from 'next/image'
import Card from '@/components/Card'

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
      <hr className="mt-10 mb-8 border-t border-gray-200 dark:border-gray-700" />
      <h2 className="text-gradient-factlink-custom mb-8 text-left text-3xl font-bold tracking-tight md:text-4xl">
        MOST RECENT ARTICLES
      </h2>
      {/* Horizontal line above Most Recent Articles Section */}

      {/* Most Recent Articles Section */}
      {posts.length > 0 && (
        <section className="group mx-auto mt-20 mb-12 max-w-6xl rounded-2xl bg-white p-4 shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl sm:p-8 dark:bg-gray-900">
          <div className="flex flex-col gap-8 md:flex-row md:items-stretch">
            {/* Featured Image */}
            <div className="flex w-full flex-1 flex-col items-center justify-center md:w-1/2">
              <Link
                href={`/${posts[0].slug}`}
                className="block w-full overflow-hidden rounded-t-xl"
              >
                <Image
                  src={posts[0].images?.[0] || '/static/images/topic.png'}
                  alt={posts[0].title}
                  width={400}
                  height={220}
                  className="mx-auto mb-0 h-[180px] w-full rounded-t-xl object-cover object-center transition-transform duration-300 group-hover:scale-105 sm:h-[220px]"
                  priority
                />
              </Link>
            </div>
            {/* Post Meta */}
            <div className="flex w-full flex-1 flex-col justify-center px-0 sm:px-6 md:w-1/2">
              <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl md:text-3xl dark:text-white">
                <Link
                  href={`/${posts[0].slug}`}
                  className="transition-colors duration-200 hover:text-pink-400 hover:underline"
                >
                  {posts[0].title}
                </Link>
              </h3>
              <p className="mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-300">
                {posts[0].summary}
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {posts[0].tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white transition hover:scale-105 hover:bg-pink-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Horizontal line above blog list */}
      <hr className="my-12 border-t border-gray-200 dark:border-gray-700" />

      {/* Blog List */}
      <section className="mx-auto max-w-6xl px-2 pt-8 sm:px-4">
        {!posts.length && <div className="text-center text-gray-500">No posts found.</div>}
        <ul className="mx-auto max-w-6xl space-y-8 sm:space-y-12">
          {paginatedPosts.map((post) => {
            const { slug, date, title, summary, tags, images, readingTime } = post
            return (
              <li key={slug} className="">
                <Link href={`/${slug}`} className="group block">
                  <div className="flex flex-col items-stretch overflow-hidden rounded-2xl border-2 border-gray-200/60 bg-white p-0 shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl md:flex-row dark:border-gray-800 dark:bg-gray-900">
                    {/* Content Side */}
                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-8">
                      <div className="mb-2 text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
                        {formatDate(date, siteMetadata.locale)}
                        {readingTime && <> • {readingTime.text}</>}
                      </div>
                      <h2 className="mb-2 text-lg font-bold text-black transition-colors duration-200 group-hover:text-pink-400 group-hover:underline sm:text-2xl md:text-3xl dark:text-white">
                        {title}
                      </h2>
                      <p className="mb-4 text-sm text-gray-700 sm:text-base dark:text-gray-300">
                        {summary}
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white transition hover:scale-105 hover:bg-pink-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-block font-semibold text-pink-500 transition-colors duration-200 group-hover:text-pink-400 group-hover:underline">
                        Read more &rarr;
                      </span>
                    </div>
                    {/* Image Side */}
                    <div className="flex w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-t-xl md:w-1/3 md:-translate-x-6">
                      <Image
                        src={images?.[0] || '/static/images/topic.png'}
                        alt={title}
                        width={320}
                        height={180}
                        className="h-[160px] w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 sm:h-[180px] md:h-[180px] md:min-h-[180px]"
                        priority={false}
                      />
                    </div>
                  </div>
                </Link>
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
        {/* Blogs per page dropdown moved to bottom */}
        <div className="mt-8 flex items-center justify-center gap-2">
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
