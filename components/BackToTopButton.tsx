'use client'

export default function BackToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="rounded-full bg-pink-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition-colors hover:bg-pink-600 focus:ring-2 focus:ring-pink-300 focus:outline-none"
      aria-label="Back to top"
    >
      ↑ Back to Top
    </button>
  )
}
