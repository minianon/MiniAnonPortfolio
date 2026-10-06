export interface Stat {
  value: number
  suffix: string
  label: string
  /** Replace value/suffix with this community's live count from /api/community-stats */
  live?: 'whatsapp'
}

export interface Achievement {
  title: string
  detail?: string
  href?: string
  links?: { label: string; href: string }[]
}

export interface Resource {
  title: string
  description: string
  href: string
}

export const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Devs mentored" },
  { value: 26, suffix: "K+", label: "LinkedIn followers" },
  { value: 2.6, suffix: "K", label: "Community", live: "whatsapp" },
  { value: 1000, suffix: "+", label: "Days of LeetCode" },
]

export const achievements: Achievement[] = [
  {
    title: "Microsoft SWE Intern",
    detail: "Selected through an off-campus process",
    href: "https://medium.com/@minianon/microsoft-swe-intern-hyderabad-bengaluru-noida-sep-2024-offer-28f71a07adce",
  },
  {
    title: "Featured 3× on Times Square",
    detail: "Recognised for developer mentorship",
    href: "https://www.linkedin.com/posts/minianon_timessquare-topmate-keepbuilding-ugcPost-7366124258722316289-kTVg/",
  },
  {
    title: "Top 0.1% mentor on Topmate",
    detail: "4.67/5 rating, People's Choice & Community Care badges",
    href: "https://topmate.io/tusharbhardwaj",
  },
  {
    title: "2× Hackathon winner",
    links: [
      { label: "SaaS Market", href: "https://x.com/joni_vrbt/status/2028263528583348552?s=20" },
      { label: "Vibeathon", href: "https://x.com/joni_vrbt/status/2042710597704519848?s=20" },
    ],
  },
  {
    title: "LeetCode top 14,100 globally",
    detail: "1,300+ problems solved",
    href: "https://leetcode.com/u/minianon/",
  },
  {
    title: "Patent & research",
    detail: "Published a patent; Edu Hub accepted at 2 academic conferences",
  },
]

export const resources: Resource[] = [
  { title: "System Design", description: "Designing systems at scale and acing system design rounds", href: "https://github.com/minianon/System-Design" },
  { title: "1Shot-OS", description: "Operating systems fundamentals for quick revision", href: "https://github.com/minianon/1Shot-OS" },
  { title: "1Shot-DBMS", description: "Database concepts for interview preparation", href: "https://github.com/minianon/1Shot-DBMS" },
  { title: "1Shot-CN", description: "Computer networks essentials in one shot", href: "https://github.com/minianon/1Shot-CN" },
  { title: "1Shot-SQL", description: "SQL concepts and patterns for interviews", href: "https://github.com/minianon/1Shot-SQL" },
  { title: "1Shot-OOPS", description: "OOPS revision with C++ examples", href: "https://github.com/minianon/1Shot-OOPS" },
  { title: "HR Interview Questions", description: "Behavioural questions with structured answers", href: "https://github.com/minianon/Most-common-HR-interview-questions" },
  { title: "Senior SWE Resources", description: "Expectations, preparation, and growth", href: "https://github.com/minianon/Resources-for-Senior-Software-Engineer" },
  { title: "LeetCode Company-wise", description: "Curated problems grouped by company", href: "https://github.com/minianon/LeetCode-Questions-CompanyWise" },
  { title: "GitHub Basics", description: "Practical Git & GitHub essentials", href: "https://github.com/minianon/github_basics" },
]

export interface Community {
  name: string
  description: string
  href: string
  cta: string
  platform: 'revert' | 'whatsapp' | 'telegram'
  /** Shown until /api/community-stats returns a live count */
  members?: string
}

export const communities: Community[] = [
  {
    name: "Revert",
    description: "Job alerts, questions and referrals — where you're a username, not a phone number.",
    href: "https://revert.minianon.in/",
    cta: "Join Revert",
    platform: "revert",
  },
  {
    name: "WhatsApp Job Alerts",
    description: "Internships, off-campus drives, and openings shared daily.",
    href: "https://whatsapp.com/channel/0029Vb67tYF0rGiSuzXcHw2C",
    cta: "Join community",
    platform: "whatsapp",
    members: "2.6K followers",
  },
  {
    name: "Telegram Job Alerts",
    description: "The same daily alerts, for those who live on Telegram.",
    href: "https://t.me/minianonjobalerts",
    cta: "Join channel",
    platform: "telegram",
  },
]

export interface MediaItem {
  title: string
  description: string
  youtubeId: string
}

export const media: MediaItem[] = [
  {
    title: "Turn Your Resume Into a Live Portfolio | ShortlistMe",
    description: "Generating, customising, and sharing a portfolio straight from a resume — with analytics.",
    youtubeId: "4nCCIvL8SvQ",
  },
  {
    title: "Built a Better Linktree | MiniLink",
    description: "Why MiniLink is simpler to use, and a walkthrough of what it offers.",
    youtubeId: "BVS7qoXoRCs",
  },
]

export const philosophy = {
  quote: "Small steps, every day.",
  body: "I build tools to solve my own problems, then share them with the world. Currently exploring how AI changes everything about software development.",
}
