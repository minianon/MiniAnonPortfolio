import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectsListClient from '@/components/ProjectsListClient'

const description = 'AI products and developer tools built by Tushar Bhardwaj (Mini Anon) — Weaave, ShortlistMe, HireLens, MiniLink and more, with live demos and source code.'

export const metadata: Metadata = {
  title: 'Projects | Tushar Bhardwaj',
  description,
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Projects | Tushar Bhardwaj', description, url: '/projects', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tushar Bhardwaj — Mini Anon' }] },
  twitter: { card: 'summary_large_image', title: 'Projects | Tushar Bhardwaj', description, images: ['/opengraph-image'] },
}

export default function ProjectsPage() {
  return <ProjectsListClient projects={projects} />
}
