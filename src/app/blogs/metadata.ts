import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Tushar Bhardwaj',
  alternates: { canonical: '/blogs' },
  description: 'Interview experiences (Microsoft, Stripe, CRED, Eightfold.ai) and engineering lessons by Tushar Bhardwaj (Mini Anon).',
  openGraph: {
    title: 'Blog | Tushar Bhardwaj',
    description: 'Interview experiences (Microsoft, Stripe, CRED, Eightfold.ai) and engineering lessons by Tushar Bhardwaj (Mini Anon).',
    type: 'website',
    url: '/blogs',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tushar Bhardwaj — Mini Anon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Tushar Bhardwaj',
    images: ['/opengraph-image'],
    description: 'Interview experiences (Microsoft, Stripe, CRED, Eightfold.ai) and engineering lessons by Tushar Bhardwaj (Mini Anon).',
  }
}