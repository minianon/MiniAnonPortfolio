import type { Metadata } from 'next'
import { sponsors } from '@/data/sponsors'
import SponsorsListClient from '@/components/SponsorsListClient'

const description = 'Support Tushar Bhardwaj (Mini Anon) — buy a chai or sponsor on GitHub to keep free interview playbooks, job alerts and open-source tools going.'

export const metadata: Metadata = {
  title: 'Sponsors | Tushar Bhardwaj',
  description,
  alternates: { canonical: '/sponsors' },
  openGraph: { title: 'Sponsors | Tushar Bhardwaj', description, url: '/sponsors', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tushar Bhardwaj — Mini Anon' }] },
}

export default function SponsorsPage() {
  return <SponsorsListClient sponsors={sponsors} />
}
