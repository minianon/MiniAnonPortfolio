import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { stats } from '@/data/highlights'

export const alt = 'Tushar Bhardwaj — Mini Anon | Software Engineer & AI Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const [serif, sans, photo] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/fonts/InstrumentSerif-Regular.ttf')),
    readFile(join(process.cwd(), 'src/app/fonts/HankenGrotesk-Medium.ttf')),
    readFile(join(process.cwd(), 'public/pfp.jpeg')),
  ])
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'radial-gradient(circle at 85% 0%, #1f2a44 0%, #111113 55%)',
          color: '#fafafa',
          fontFamily: 'Hanken Grotesk',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#a1a1aa', letterSpacing: 1 }}>minianon.in</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 22,
              color: '#d4d4d8',
              padding: '8px 18px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: '#10b981' }} />
            Now building Weaave
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={168}
            height={168}
            style={{ borderRadius: 999, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.15)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'Instrument Serif', fontSize: 92, lineHeight: 1 }}>
              Tushar Bhardwaj
            </div>
            <div style={{ display: 'flex', marginTop: 14, fontSize: 30, color: '#a1a1aa' }}>
              Mini Anon · Software Engineer & AI Builder · ex-Microsoft
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '22px 0',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ display: 'flex', fontFamily: 'Instrument Serif', fontSize: 52, lineHeight: 1 }}>
                {stat.value.toLocaleString('en-US')}
                {stat.suffix}
              </div>
              <div style={{ display: 'flex', marginTop: 8, fontSize: 18, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 2 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Instrument Serif', data: serif, style: 'normal', weight: 400 },
        { name: 'Hanken Grotesk', data: sans, style: 'normal', weight: 500 },
      ],
    },
  )
}
