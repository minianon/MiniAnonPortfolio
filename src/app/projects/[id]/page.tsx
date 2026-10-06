import { getProjectById, getAllProjects } from '@/data/projects'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProjectDetailClient from '@/components/ProjectDetailClient'

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }
  
  const images = project.image ? [{ url: project.image, alt: `${project.title} by Tushar Bhardwaj` }] : undefined
  return {
    title: `${project.title} | Tushar Bhardwaj`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `/projects/${project.id}`,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    }
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = getProjectById(id)
  const allProjects = getAllProjects()
  
  if (!project) {
    notFound()
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.longDescription ?? project.description,
    url: project.liveLink ?? `https://minianon.in/projects/${project.id}`,
    image: project.image ? `https://minianon.in${project.image}` : undefined,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    keywords: project.tags.join(', '),
    sameAs: project.githubLink ? [project.githubLink] : undefined,
    author: { '@type': 'Person', name: 'Tushar Bhardwaj', url: 'https://minianon.in' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetailClient project={project} allProjects={allProjects} />
    </>
  )
}
