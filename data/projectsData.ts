interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Factlink',
    description: `Factlink is a decentralized financial contracts platform built to enable Universal Market Access. It allows anyone to design and create synthetic assets on Ethereum, providing global access to financial markets without intermediaries.`,
    imgSrc: '/static/images/logo.png',
    href: 'https://factlink.org',
  },
  {
    title: 'Polymarket',
    description: `Polymarket is the world's leading information markets platform, allowing users to trade on the world's most highly-debated topics and events using blockchain technology.`,
    imgSrc: '/static/images/logo.png',
    href: 'https://polymarket.com',
  },
]

export default projectsData
