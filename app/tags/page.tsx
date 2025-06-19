import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  // Get all posts and count tags dynamically
  const posts = allCoreContent(allBlogs)
  const tagCounts: Record<string, number> = {}
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-12">
        <h1 className="text-gradient-factlink-custom mb-8 text-4xl font-extrabold md:text-6xl dark:text-white">
          Topics
        </h1>
        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedTags.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              aria-label={`View posts tagged ${t}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 transition group-hover:text-pink-600 dark:text-gray-100">
                  {t}
                </span>
                <span className="ml-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-pink-600 transition group-hover:bg-pink-100 dark:bg-gray-800 dark:text-pink-400 dark:group-hover:bg-pink-900">
                  {tagCounts[t]}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <img
          src="/static/images/blog/topic.png"
          alt="Factlink Topics"
          className="mx-auto mt-12 max-w-xl rounded-2xl shadow-lg"
        />
      </div>
    </>
  )
}
