import { NextResponse } from 'next/server'

export const revalidate = 3600

// Returns { [repoName]: stars } for all of a user's public repos in one GitHub call.
export async function GET() {
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN
  try {
    const repos: { name: string; stargazers_count: number }[] = []
    for (let page = 1; page <= 5; page++) {
      const res = await fetch(`https://api.github.com/users/minianon/repos?per_page=100&type=owner&page=${page}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600 },
      })
      if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
      const batch: typeof repos = await res.json()
      repos.push(...batch)
      if (batch.length < 100) break
    }
    const stars = Object.fromEntries(repos.map((r) => [r.name.toLowerCase(), r.stargazers_count]))
    return NextResponse.json({ success: true, stars })
  } catch {
    return NextResponse.json({ success: false, stars: {} }, { status: 500 })
  }
}
