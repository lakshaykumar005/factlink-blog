import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center transition-colors duration-500">
      <div className="flex flex-col items-center max-w-lg w-full">
        <h1 className="text-7xl md:text-9xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <p className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
          Sorry, we couldn't find this page.
        </p>
        <p className="mb-8 text-center text-gray-700 dark:text-gray-300">
          But don't worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm leading-5 font-medium text-white shadow-xs transition-colors duration-150 hover:bg-blue-700 focus:outline-hidden dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
