import { NextResponse } from 'next/server'

export const revalidate = 3600

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'

async function scrape(url: string, pattern: RegExp): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, next: { revalidate: 3600 } })
    if (!res.ok) return null
    const match = (await res.text()).match(pattern)
    return match ? match[1] : null
  } catch {
    return null
  }
}

// Member counts scraped from each community's public page; null when a page can't be read.
export async function GET() {
  const [whatsapp, telegram, revert] = await Promise.all([
    // "2.6K followers"
    scrape('https://whatsapp.com/channel/0029Vb67tYF0rGiSuzXcHw2C', /([\d.,]+[KM]?) followers/i),
    // <div class="tgme_page_extra">30 members, 3 online</div>
    scrape('https://t.me/minianonjobalerts', /tgme_page_extra">\s*([\d\s,]+) (?:members|subscribers)/i),
    // "190 people are in the room."
    scrape('https://revert.minianon.in/', /([\d,]+\+?) people are in the room/i),
  ])
  return NextResponse.json({
    whatsapp: whatsapp && `${whatsapp} followers`,
    telegram: telegram && `${telegram.replace(/\s/g, '')} members`,
    revert: revert && `${revert} members`,
  })
}
