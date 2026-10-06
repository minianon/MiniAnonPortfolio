import { ArrowUpRight, Play } from 'lucide-react'
import { achievements, media, philosophy } from '@/data/highlights'

// Server-rendered: these sections have no interactivity, so they ship no client JS
const linkClass = "touch-manipulation active:opacity-75"
const headingClass = "text-base sm:text-xl opacity-20 font-[family-name:var(--font-instrument-serif)]"

export function Recognition() {
  return (
    <div className="sm:px-12 py-2">
      <h2 className={`${headingClass} mt-4 sm:mt-6 mb-2 px-4`}>Recognition</h2>
      <ul className="px-4 list-none p-0 m-0 group">
        {achievements.map((item) => {
          const body = (
            <div className="flex items-start justify-between gap-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="min-w-0">
                <div className="text-sm sm:text-[15px] font-medium text-black/80 dark:text-white/80">{item.title}</div>
                {item.detail && <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{item.detail}</div>}
              </div>
              {item.href && <ArrowUpRight className="size-4 shrink-0 mt-1 text-neutral-400" />}
              {item.links && (
                <div className="flex gap-3 shrink-0 mt-0.5">
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-[#006FEE] transition-colors no-underline">
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
          return (
            <li key={item.title} className="m-0 p-0 transition-opacity duration-300 group-has-hover:opacity-40 group-has-hover:hover:opacity-100">
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={`block no-underline ${linkClass}`}>{body}</a>
              ) : body}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Media() {
  return (
    <div className="sm:px-12 py-2">
      <div className="px-4 mt-4 sm:mt-6 mb-4 sm:mb-6">
        <h2 className={headingClass}>Watch Me Build</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-0">Product walkthroughs of things I&apos;ve shipped.</p>
      </div>
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
        {media.map((item) => (
          <a
            key={item.youtubeId}
            href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/media block no-underline ${linkClass}`}
          >
            <div className="relative aspect-video overflow-hidden rounded-lg border border-black/10 dark:border-white/5 bg-neutral-100 dark:bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
                alt={item.title}
                loading="lazy"
                className="m-0 w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/media:bg-black/30 transition-colors">
                <div className="size-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play className="size-5 text-black fill-black translate-x-0.5" />
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm font-medium text-black/80 dark:text-white/85">{item.title}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{item.description}</div>
          </a>
        ))}
      </div>
    </div>
  )
}

export function Philosophy() {
  return (
    <div className="sm:px-12 py-2">
      <h2 className={`${headingClass} mt-4 sm:mt-6 mb-3 px-4`}>Philosophy</h2>
      <div className="px-4 mb-4 sm:mb-6">
        <blockquote className="m-0 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 not-italic">
          <p className="m-0 text-xl sm:text-2xl font-[family-name:var(--font-instrument-serif)] italic text-black dark:text-white">
            &ldquo;{philosophy.quote}&rdquo;
          </p>
          <p className="mt-2 mb-0 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">{philosophy.body}</p>
        </blockquote>
      </div>
    </div>
  )
}
