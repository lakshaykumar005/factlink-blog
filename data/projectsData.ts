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
    imgSrc: '/static/images/factlinkproject.png',
    href: 'https://factlink.xyz',
  },
]

export default projectsData
