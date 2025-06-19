import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'All Articles' })

export default async function BlogPage({ searchParams }: { searchParams: { pageSize?: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageSize = parseInt(searchParams?.pageSize || '5')
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / pageSize)
  const initialDisplayPosts = posts.slice(0, pageSize * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Articles"
    />
  )
}
