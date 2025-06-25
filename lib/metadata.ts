import { Metadata } from "next";

interface SectionMetadata {
  title: string;
  description: string;
  keywords: string[];
}

const defaultMetadata = {
  title: "Factlink - Decentralized Optimistic Oracle for Solana",
  description:
    "Factlink is an optimistic oracle that trustlessly records any verifiable data on the Solana blockchain.",
  keywords: [
    "oracle",
    "solana",
    "blockchain",
    "decentralized",
    "optimistic oracle",
    "prediction markets",
    "insurance markets",
    "synthetic assets",
    "DeFi",
    "crypto",
  ],
  siteUrl: "https://factlink-blog.vercel.app",
  siteName: "Factlink-blog",
  twitterHandle: "@factlinkoracle",
};

// Define metadata for each section
export const sectionMetadata: Record<string, SectionMetadata> = {
  hero: {
    title: "Factlink - Decentralized Optimistic Oracle for Solana",
    description:
      "Factlink can bring any verifiable data on-chain. Built for the future of on-chain truth.",
    keywords: [
      "optimistic oracle",
      "solana oracle",
      "decentralized oracle",
      "blockchain data",
    ],
  },
  compare: {
    title: "How Factlink Compares - 99% Cheaper Than UMA",
    description:
      "Factlink offers 99% cheaper voting costs than UMA and can scale to 10K disputes/day and 500K queries/day.",
    keywords: [
      "UMA comparison",
      "oracle costs",
      "solana vs ethereum",
      "scalable oracle",
    ],
  },
  "how-it-works": {
    title: "How Factlink Works - Four-Stage Verification Process",
    description:
      "Learn how Factlink verifies data through Proposal, Assertion, Dispute, and Voting stages.",
    keywords: [
      "oracle process",
      "data verification",
      "optimistic oracle workflow",
      "blockchain verification",
    ],
  },
  "for-voters": {
    title: "Factlink for Voters - Earn Up to 25% APR",
    description:
      "Participate as a voter in Factlink's oracle network. Stake, vote, and earn up to 25% APR rewards.",
    keywords: [
      "oracle voting",
      "staking rewards",
      "DeFi earning",
      "oracle participation",
    ],
  },
  "for-builders": {
    title: "Build with Factlink - Oracle Infrastructure for Developers",
    description:
      "Power prediction markets, insurance markets, and synthetic assets with Factlink's decentralized oracle.",
    keywords: [
      "oracle API",
      "prediction markets",
      "insurance markets",
      "synthetic assets",
      "DeFi development",
    ],
  },
};

interface GenerateMetadataProps {
  section?: keyof typeof sectionMetadata;
  customTitle?: string;
  customDescription?: string;
  additionalKeywords?: string[];
}

export function generateMetadata({
  section = "hero",
  customTitle,
  customDescription,
  additionalKeywords = [],
}: GenerateMetadataProps = {}): Metadata {
  const sectionData = sectionMetadata[section];
  const pageTitle = customTitle || sectionData.title;
  const pageDescription = customDescription || sectionData.description;
  const pageUrl =
    section === "hero"
      ? defaultMetadata.siteUrl
      : `${defaultMetadata.siteUrl}#${section}`;
  const allKeywords = [
    ...defaultMetadata.keywords,
    ...sectionData.keywords,
    ...additionalKeywords,
  ];

  // Use static image for OG and Twitter
  const staticImageUrl = `${defaultMetadata.siteUrl}/static/images/factlinkproject.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords.join(", "),
    authors: [{ name: "Factlink Team" }],
    creator: "Factlink-Blog",
    publisher: "Factlink-Blog",

    // Open Graph
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: defaultMetadata.siteName,
      images: [
        {
          url: staticImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      site: defaultMetadata.twitterHandle,
      creator: defaultMetadata.twitterHandle,
      images: [staticImageUrl],
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: defaultMetadata.siteUrl,
    },
  };
}