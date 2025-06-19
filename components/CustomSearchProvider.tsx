'use client'

import { KBarSearchProvider } from 'pliny/search/KBar'
import { useRouter } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'

export const CustomSearchProvider = ({ children }) => {
  const router = useRouter()
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          // Removed Homepage action
        ],
        onSearchDocumentsLoad(json) {
          return json.map((post: CoreContent<Blog>) => ({
            id: post.path,
            name: post.title,
            keywords: [post.title, ...(post.tags || [])].join(' '),
            section: 'Blog',
            subtitle: post.tags.join(', '),
            perform: () => router.push('/' + post.path.replace(/^blog\//, '')),
          }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}

export default CustomSearchProvider
