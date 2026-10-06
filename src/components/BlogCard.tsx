import { FC } from 'react'
import { BlogPost } from '@/types/blog'

// Medium-style clap (hands) icon
const ClapIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M8.5 11.5 6 9a1.3 1.3 0 0 0-1.9 1.9l4.6 4.6" />
    <path d="M10.2 9.8 7.3 6.9a1.3 1.3 0 0 0-1.9 1.9" />
    <path d="m12.2 9.3-2.7-2.7a1.3 1.3 0 0 1 1.9-1.9l5 5c1.6 1.6 1.9 4.2.4 6.1l-.6.7a5 5 0 0 1-7 .3l-4.4-4.4a1.3 1.3 0 0 1 1.9-1.9" />
    <path d="M15 3.5 15.5 2M18 5l1.2-1M19.2 7.8h1.5" />
  </svg>
)

interface BlogCardProps {
  blog: BlogPost
}

export const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const CardContent = () => (
    <article className="group/item cursor-pointer touch-manipulation">
      {/* Swiss Design Grid Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-6 sm:py-8 border-b border-neutral-200 dark:border-neutral-800 transition-opacity duration-300 group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100">

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h2 className="text-sm sm:text-[15px] leading-6 sm:leading-7 text-black/80 group-has-hover:hover:text-black dark:text-white/80 dark:group-has-hover:hover:text-white font-medium transition-colors duration-300">
            {blog.title}
          </h2>
        </div>

        {/* Metadata */}
        <div className="shrink-0 flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide transition-opacity duration-300 group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100">
          {blog.claps !== undefined && (
            <span className="inline-flex items-center gap-1 tabular-nums" title={`${blog.claps} claps on Medium`}>
              <ClapIcon className="size-3.5" />
              {blog.claps}
            </span>
          )}
          <span>{blog.readTime}</span>
        </div>

      </div>
    </article>
  )

  return (
    <a 
      href={blog.externalUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full touch-manipulation active:opacity-75"
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      <CardContent />
    </a>
  )
}
