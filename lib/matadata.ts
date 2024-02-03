import { Metadata } from 'next'

export function constructMetadata({
  title = 'Joltt - An app for the best online shopping experience',
  description = 'An app for the best online shopping experience',
  image = '',
  icons = '/favicon.svg',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@d_cipherer',
    },
    icons,
    metadataBase: new URL('https://jolttcollections.vercel.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
