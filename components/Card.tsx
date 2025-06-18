import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, compact = false }) => (
  <div className={`${compact ? 'max-w-[320px] p-2' : 'md max-w-[544px] p-4 md:w-1/2'}`}>
    <div
      className={`${
        imgSrc && 'h-full'
      } overflow-hidden rounded-md border-2 border-gray-200/60 bg-white dark:border-gray-800 dark:bg-gray-900`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className={`object-cover object-center ${compact ? 'h-28' : 'md:h-36 lg:h-48'}`}
              width={compact ? 320 : 544}
              height={compact ? 140 : 306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className={`object-cover object-center ${compact ? 'h-28' : 'md:h-36 lg:h-48'}`}
            width={compact ? 320 : 544}
            height={compact ? 140 : 306}
          />
        ))}
      <div className={`${compact ? 'p-3' : 'p-6'}`}>
        <h2 className={`${compact ? 'mb-2 text-lg font-bold' : 'mb-3 text-2xl leading-8 font-bold tracking-tight'} text-black dark:text-white`}>
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className={`prose mb-2 max-w-none text-gray-500 dark:text-gray-400 ${compact ? 'text-sm' : ''}`}>{description}</p>
        {href && (
          <Link
            href={href}
            className={`text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 ${compact ? 'text-sm' : 'text-base'} leading-6 font-medium`}
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
