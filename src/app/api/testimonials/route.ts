import { NextResponse } from 'next/server'

export const revalidate = 21600

interface TopmateReview {
  id: number
  follower_name: string
  created: string
  rating: number
  pinned: boolean
  is_visible: boolean
  testimonial: { text: string | null; is_anonymous: boolean | null; hide_follower_name: boolean | null } | null
}

// "kishan deshpande" / "NANCY SHARMA" -> "Kishan Deshpande" / "Nancy Sharma"
const titleCase = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, ' ').replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase())

const API = 'https://api.galactus.run/public-booking-reviews/?username=tusharbhardwaj&page=1&page_size=100'

async function fetchReviews(pinned: boolean): Promise<TopmateReview[]> {
  const res = await fetch(`${API}&pinned=${pinned}`, { next: { revalidate: 21600 } })
  if (!res.ok) throw new Error(`Topmate responded ${res.status}`)
  return (await res.json()).results ?? []
}

// Public written reviews from topmate.io/tusharbhardwaj — pinned first, then newest.
export async function GET() {
  try {
    const [pinned, rest] = await Promise.all([fetchReviews(true), fetchReviews(false)])
    const testimonials = [...pinned, ...rest]
      .filter((r) => r.is_visible && r.testimonial?.text?.trim())
      .map((r) => ({
        id: r.id,
        quote: r.testimonial!.text!.trim(),
        name: r.testimonial!.is_anonymous || r.testimonial!.hide_follower_name ? 'Topmate mentee' : titleCase(r.follower_name),
        date: new Date(r.created).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        rating: r.rating,
      }))
    return NextResponse.json({ success: true, testimonials })
  } catch {
    return NextResponse.json({ success: false, testimonials: [] }, { status: 500 })
  }
}
