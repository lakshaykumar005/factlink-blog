import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, compact = false }) => {
  const cardContent = (
    <div
      className={`w-full overflow-hidden rounded-md border-2 border-gray-200/60 bg-white dark:border-gray-800 dark:bg-gray-900`}
    >
      {imgSrc && (
        <Image
          alt={title}
          src={imgSrc}
          className={`w-full object-cover object-center ${compact ? 'h-28' : 'h-40 sm:h-48 md:h-36 lg:h-48'}`}
          width={compact ? 320 : 544}
          height={compact ? 140 : 306}
        />
      )}
      <div className={`${compact ? 'p-3' : 'p-4 sm:p-6'}`}>
        <h2
          className={`${compact ? 'mb-2 text-lg font-bold' : 'mb-3 text-xl leading-8 font-bold tracking-tight sm:text-2xl'} text-black dark:text-white`}
        >
          {title}
        </h2>
        <p
          className={`prose mb-2 max-w-none text-gray-500 dark:text-gray-400 ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}
        >
          {description}
        </p>
        {href && (
          <span
            className={`text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 ${compact ? 'text-sm' : 'text-base sm:text-lg'} leading-6 font-medium`}
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div className={`w-full ${compact ? 'max-w-[320px] p-2' : 'max-w-full p-2 sm:p-4 md:w-1/2'}`}>
      {href ? (
        <Link
          href={href}
          aria-label={`Link to ${title}`}
          className="focus:ring-primary-500 block focus:ring-2 focus:outline-none"
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  )
}

export default Card
