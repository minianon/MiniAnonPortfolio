'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, Play, Star } from 'lucide-react'
import { FaTelegram, FaWhatsapp } from 'react-icons/fa6'
import NeumorphButton from './NeumorphButton'
import { achievements, communities, type Community as CommunityItem, media, philosophy, resources, stats, testimonials, testimonialsSummary } from '@/data/highlights'

const linkClass = "touch-manipulation active:opacity-75"
const headingClass = "text-base sm:text-xl opacity-20 font-[family-name:var(--font-instrument-serif)]"

// Counts from 0 to `target` once the element scrolls into view
function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        setValue(target * (1 - Math.pow(1 - t, 3)))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration])
  return { ref, value }
}

type CommunityCounts = Partial<Record<CommunityItem['platform'], string | null>>

// One shared request for the stats strip and the community cards
let communityStatsRequest: Promise<CommunityCounts> | null = null
function useCommunityStats() {
  const [counts, setCounts] = useState<CommunityCounts>({})
  useEffect(() => {
    communityStatsRequest ??= fetch('/api/community-stats')
      .then((res) => res.json())
      .catch(() => ({}))
    communityStatsRequest.then(setCounts)
  }, [])
  return counts
}

// "2.6K followers" -> { value: 2.6, suffix: "K" }
function parseCount(text: string | null | undefined) {
  const match = text?.match(/^([\d.,]+)([KM]?)/i)
  return match ? { value: parseFloat(match[1].replace(/,/g, '')), suffix: match[2].toUpperCase() } : null
}

function StatCell({ stat, counts }: { stat: (typeof stats)[number]; counts: CommunityCounts }) {
  const { value: target, suffix } = (stat.live && parseCount(counts[stat.live])) || stat
  const decimals = Number.isInteger(target) ? 0 : 1
  const { ref, value } = useCountUp(target)
  return (
    <div ref={ref} className="bg-white dark:bg-zinc-900 px-3 py-3.5 sm:py-4 flex flex-col items-center text-center">
      <div className="text-2xl sm:text-[28px] leading-none text-black dark:text-white tabular-nums font-[family-name:var(--font-instrument-serif)]">
        {value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        <span className="ml-0.5 text-black/70 dark:text-white/70">{suffix}</span>
      </div>
      <div className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
        {stat.label}
      </div>
    </div>
  )
}

export function StatsStrip() {
  const counts = useCommunityStats()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-lg border border-black/10 dark:border-white/5 bg-black/10 dark:bg-white/5">
      {stats.map((stat) => (
        <StatCell key={stat.label} stat={stat} counts={counts} />
      ))}
    </div>
  )
}

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

function useRepoStars() {
  const [stars, setStars] = useState<Record<string, number>>({})
  useEffect(() => {
    fetch('/api/repo-stars')
      .then((res) => res.json())
      .then((data) => setStars(data.stars ?? {}))
      .catch(() => {})
  }, [])
  return stars
}

const repoName = (href: string) => href.split('/').pop()!.toLowerCase()

export function FreeResources() {
  const stars = useRepoStars()
  return (
    <div className="sm:px-12 py-2">
      <div className="px-4 mt-4 sm:mt-6 mb-4 sm:mb-6">
        <h2 className={headingClass}>Interview Playbooks</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-0">Free, open-source prep material I maintain on GitHub.</p>
      </div>
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-3 group">
        {resources.map((resource) => (
          <a
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/res flex items-start gap-3 rounded-lg border border-black/10 dark:border-white/5 bg-white dark:bg-zinc-900 p-4 no-underline hover:border-black/20 dark:hover:border-white/15 transition-[opacity,border-color] duration-300 group-has-hover:opacity-40 group-has-hover:hover:opacity-100 ${linkClass}`}
          >
            <BookOpen className="size-4 shrink-0 mt-0.5 text-neutral-400 group-hover/res:text-[#006FEE] transition-colors" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-black/80 dark:text-white/85">{resource.title}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{resource.description}</div>
            </div>
            {stars[repoName(resource.href)] > 0 && (
              <span className="shrink-0 inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
                <Star className="size-3.5 fill-current text-amber-500" />
                {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(stars[repoName(resource.href)]).toLowerCase()}
              </span>
            )}
          </a>
        ))}
      </div>

    </div>
  )
}

const RevertLogo = ({ className }: { className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/revert.svg" alt="" className={`m-0 rounded-full ${className}`} />
)

const platformStyles = {
  revert: { Icon: RevertLogo, tint: '' },
  whatsapp: { Icon: FaWhatsapp, tint: 'text-[#25D366] bg-[#25D366]/10' },
  telegram: { Icon: FaTelegram, tint: 'text-[#229ED9] bg-[#229ED9]/10' },
}

export function Community() {
  const counts = useCommunityStats()
  return (
    <div className="sm:px-12 py-2">
      <div className="px-4 mt-4 sm:mt-6 mb-4 sm:mb-6">
        <h2 className={headingClass}>Community</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-0">Job alerts, referrals, and a place to ask questions — free, always.</p>
      </div>
      <div className="px-4 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 sm:mb-6">
        {communities.map((c) => {
          const { Icon, tint } = platformStyles[c.platform]
          const live = counts[c.platform]
          // "2.6K followers" -> ["2.6K", "followers"]
          const [count, unit] = (live ?? c.members ?? '').split(/\s+(.*)/)
          return (
            <div
              key={c.href}
              className="flex flex-col rounded-lg border border-black/10 dark:border-white/5 bg-white dark:bg-zinc-900 p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`size-8 shrink-0 rounded-full flex items-center justify-center ${tint}`}>
                  <Icon className={c.platform === 'revert' ? 'size-8' : 'size-4'} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-black/85 dark:text-white/90 leading-snug">{c.name}</div>
                  {count && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-black/80 dark:text-white/85 tabular-nums">{count}</span>
                      <span>{unit}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 flex-1">{c.description}</div>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 self-start no-underline ${linkClass}`}
              >
                <NeumorphButton className="px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-800 dark:text-white whitespace-nowrap">
                  {c.cta} →
                </NeumorphButton>
              </a>
            </div>
          )
        })}
      </div>
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

export function Testimonials() {
  return (
    <div className="sm:px-12 py-2">
      <div className="px-4 mt-4 sm:mt-6 mb-4 sm:mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className={headingClass}>What Mentees Say</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-0">
            <Star className="inline size-3.5 -mt-0.5 mr-1 fill-current text-amber-500" />
            {testimonialsSummary.rating} on Topmate
          </p>
        </div>
        <a
          href={testimonialsSummary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 hover:text-[#006FEE] transition-colors no-underline"
        >
          Read all {testimonialsSummary.count} ↗
        </a>
      </div>
      <div className="px-4 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 sm:mb-6">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="m-0 flex flex-col rounded-lg border border-black/10 dark:border-white/5 bg-white dark:bg-zinc-900 p-4"
          >
            <span aria-hidden className="text-3xl leading-none text-neutral-300 dark:text-neutral-700 font-[family-name:var(--font-instrument-serif)]">&ldquo;</span>
            <blockquote className="m-0 mt-1 flex-1 border-0 p-0 text-sm not-italic leading-relaxed text-neutral-700 dark:text-neutral-300">
              {t.quote}
            </blockquote>
            <figcaption className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-medium text-black/80 dark:text-white/85">{t.name}</span> · {t.date}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
