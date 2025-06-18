'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'

const Giscus = () => {
  const { theme, resolvedTheme } = useTheme()
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!siteMetadata.comments?.giscusConfig) return

    const { repo, repositoryId, category, categoryId, mapping, reactions, metadata, theme, darkTheme, lang } =
      siteMetadata.comments.giscusConfig

    const giscusTheme = resolvedTheme === 'dark' ? darkTheme : theme

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repositoryId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-reactions-enabled', reactions)
    script.setAttribute('data-emit-metadata', metadata)
    script.setAttribute('data-theme', giscusTheme)
    script.setAttribute('data-lang', lang)
    script.crossOrigin = 'anonymous'
    script.async = true

    const comments = commentsRef.current
    if (comments) {
      comments.appendChild(script)
    }

    return () => {
      const comments = commentsRef.current
      if (comments) {
        comments.innerHTML = ''
      }
    }
  }, [resolvedTheme])

  return <div ref={commentsRef} />
}

export default Giscus 