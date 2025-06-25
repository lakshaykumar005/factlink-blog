'use client'

const BackToTopBlogButton = () => (
  <button
    className="text-sm tracking-widest text-gray-400 uppercase transition hover:text-pink-500"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    BACK TO TOP
  </button>
)

export default BackToTopBlogButton
