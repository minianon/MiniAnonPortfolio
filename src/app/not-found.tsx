import type { Metadata } from 'next'
import Link from 'next/link'
import NeumorphButton from '@/components/NeumorphButton'
import DiagonalPattern from '@/components/DiagonalPattern'

export const metadata: Metadata = {
  title: 'Page not found | Tushar Bhardwaj',
  robots: { index: false },
}

const destinations = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Blog' },
  { href: '/links', label: 'All my links' },
]

export default function NotFound() {
  return (
    <div className="relative min-h-screen mx-auto max-w-4xl" style={{ fontFamily: 'var(--font-hk-grotesk)' }}>
      <DiagonalPattern side="left" />
      <DiagonalPattern side="right" />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-7xl sm:text-8xl leading-none text-black dark:text-white font-[family-name:var(--font-instrument-serif)]">
          404
        </p>
        <h1 className="mt-4 text-xl sm:text-2xl font-[family-name:var(--font-instrument-serif)] italic text-neutral-700 dark:text-neutral-300">
          This page wandered off.
        </h1>
        <p className="mt-2 max-w-sm text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
          The link might be old or mistyped. Here&apos;s where you can find me instead.
        </p>
        <nav className="mt-8 flex flex-wrap justify-center gap-3">
          {destinations.map((d) => (
            <Link key={d.href} href={d.href} className="no-underline touch-manipulation active:opacity-75">
              <NeumorphButton className="px-4 py-2 text-sm font-medium text-neutral-800 dark:text-white/90">
                {d.label}
              </NeumorphButton>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  )
}
