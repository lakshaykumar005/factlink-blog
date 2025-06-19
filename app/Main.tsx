'use client'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import CustomNewsletterForm from '@/components/CustomNewsletterForm'
import { useState } from 'react'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(posts.length / MAX_DISPLAY)
  const paginatedPosts = posts.slice((page - 1) * MAX_DISPLAY, page * MAX_DISPLAY)

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

      {/* Blog List */}
      <section className="mx-auto max-w-3xl px-4">
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
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded bg-gray-200 px-4 py-2 font-semibold text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded bg-gray-200 px-4 py-2 font-semibold text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-8">
          <CustomNewsletterForm />
        </div>
      )}
    </>
  )
}
