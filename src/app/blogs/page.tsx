import { blogs } from '@/data/blogs'
import BlogsListClient from '@/components/BlogsListClient'

export { metadata } from './metadata'

export default function BlogsPage() {
  return <BlogsListClient blogs={blogs} />
}