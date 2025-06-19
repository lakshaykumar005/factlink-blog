'use client'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from './Image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const Header = () => {
  let headerClass =
    'flex items-center w-full bg-transparent dark:bg-transparent justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center gap-2">
          <ThemeLogo />
          {typeof siteMetadata.headerTitle === 'string' ? (
            <span className="text-gradient-factlink-custom text-2xl font-semibold">
              {siteMetadata.headerTitle}
            </span>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
      </div>
    </header>
  )
}

// ThemeLogo component for switching logo based on theme using next-themes
const ThemeLogo = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    // Render nothing on server to avoid hydration mismatch
    return null
  }
  return (
    <Image
      src={
        resolvedTheme === 'dark'
          ? '/static/images/factlinkwhite.png'
          : '/static/images/factlinkdark.png'
      }
      alt="Factlink Logo"
      width={32}
      height={32}
      className="rounded-full"
      priority
    />
  )
}

export default Header
