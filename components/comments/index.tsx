import Giscus from './Giscus'
import siteMetadata from '@/data/siteMetadata'

const Comments = () => {
  if (!siteMetadata.comments) {
    return null
  }

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      <Giscus />
    </div>
  )
}

export default Comments 