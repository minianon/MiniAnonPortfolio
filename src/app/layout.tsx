import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/ui/ScrollAnimations"
import GradualBlur from "@/components/GradualBlur"

const hkGrotesk = Hanken_Grotesk({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-hk-grotesk',
  display: 'swap',
})


const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-instrument-serif'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://minianon.in'),
  title: 'Tushar Bhardwaj',
  description: 'Tushar Bhardwaj (Mini Anon) — software engineer, AI builder and ex-Microsoft SWE intern. Products like Weaave and ShortlistMe, free interview playbooks, job-alert communities, and mentorship for 500+ developers.',
  keywords: [
    'Tushar Bhardwaj',
    'Mini Anon',
    'minianon',
    'software engineer',
    'AI builder',
    'developer',
    'SaaS',
    'portfolio',
    'Microsoft intern',
    'full-stack developer',
    'interview preparation',
    'system design',
    'job alerts',
    'tech mentorship',
    'Topmate mentor',
  ],
  openGraph: {
    title: 'Tushar Bhardwaj — Mini Anon | Software Engineer & AI Builder',
    description: 'Software engineer & AI builder, ex-Microsoft SWE intern. Products, free interview playbooks, job-alert communities, and mentorship for 500+ developers.',
    url: 'https://minianon.in/',
    siteName: 'Tushar Bhardwaj — Mini Anon',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tushar Bhardwaj — Mini Anon | Software Engineer & AI Builder',
    description: 'Software engineer & AI builder, ex-Microsoft SWE intern. Products, free interview playbooks, job-alert communities, and mentorship for 500+ developers.',
    creator: '@minianondev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Structured data so search engines can show a profile card for "Tushar Bhardwaj" / "Mini Anon"
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tushar Bhardwaj',
  alternateName: 'Mini Anon',
  url: 'https://minianon.in',
  image: 'https://minianon.in/pfp.jpeg',
  jobTitle: 'Software Engineer',
  description: 'Software engineer and AI builder, ex-Microsoft SWE intern. Builds AI products and developer tools, and mentors developers.',
  worksFor: { '@type': 'Organization', name: 'Vitti Capital' },
  alumniOf: { '@type': 'Organization', name: 'Microsoft' },
  knowsAbout: ['Software Engineering', 'Artificial Intelligence', 'Distributed Systems', 'Kubernetes', 'Full-stack Development', 'System Design'],
  sameAs: [
    'https://github.com/minianon',
    'https://www.linkedin.com/in/minianon',
    'https://x.com/minianondev',
    'https://medium.com/@minianon',
    'https://topmate.io/tusharbhardwaj',
    'https://link.minianon.in/tusharbhardwaj',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tushar Bhardwaj — Mini Anon',
  url: 'https://minianon.in',
  author: { '@type': 'Person', name: 'Tushar Bhardwaj' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="tMCNs2fgM6voEHBd3JsySffMFSiUCQDEFEF1iYI3-ZQ" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
        />
      </head>
      <body className={`${hkGrotesk.className} ${instrumentSerif.variable}`} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10">
            {children}
          </div>
          <GradualBlur 
            position="bottom" 
            height="5rem" 
            target="page" 
            zIndex={1}
            strength={2}
            divCount={5}
          />
          <ScrollToTop />
        </ThemeProvider>
       <script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="2cYj0B5Uv0T4q70DhnoAc"
          data-enable-batching="true"
          async
  ></script>
      </body>
    </html>
  );
}
