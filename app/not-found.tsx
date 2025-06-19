import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center transition-colors duration-500">
      <div className="flex w-full max-w-lg flex-col items-center">
        <h1 className="mb-4 text-7xl font-extrabold text-gray-900 md:text-9xl dark:text-gray-100">
          404
        </h1>
        <p className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
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
