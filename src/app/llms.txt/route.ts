import { projects } from '@/data/projects'
import { blogs } from '@/data/blogs'
import { experiences } from '@/data/experience'
import { achievements, communities, media, resources, stats } from '@/data/highlights'

export const dynamic = 'force-static'

const SITE = 'https://minianon.in'

// /llms.txt — a plain-markdown summary of the site for AI assistants and agents (https://llmstxt.org).
// Built from the same data files as the site, so it stays in sync automatically.
function buildLlmsTxt() {
  const lines = [
    '# Tushar Bhardwaj (Mini Anon)',
    '',
    '> Software engineer and AI builder from India, ex-Microsoft SWE intern, currently a Python Developer at Vitti Capital. Builds AI products and developer tools, writes interview experiences, maintains free interview-prep playbooks, runs job-alert communities, and mentors developers on Topmate.',
    '',
    `- Website: ${SITE}`,
    '- Also known as: Mini Anon (@minianon)',
    '- Currently building: Weaave, a visual AI workflow builder',
    `- At a glance: ${stats.map((s) => `${s.value.toLocaleString('en-US')}${s.suffix} ${s.label}`).join(' · ')}`,
    '',
    '## Experience',
    '',
    ...experiences.map((e) => `- **${e.position}, ${e.company}** (${e.duration}): ${e.description}`),
    '',
    '## Projects',
    '',
    ...projects.map((p) => {
      const links = [p.liveLink && `[live](${p.liveLink})`, p.githubLink && `[code](${p.githubLink})`].filter(Boolean).join(', ')
      return `- [${p.title}](${SITE}/projects/${p.id}): ${p.description}${links ? ` (${links})` : ''}`
    }),
    '',
    '## Recognition',
    '',
    ...achievements.map((a) => {
      const refs = a.href ? ` (${a.href})` : a.links ? ` (${a.links.map((l) => `[${l.label}](${l.href})`).join(', ')})` : ''
      return `- ${a.title}${a.detail ? `: ${a.detail}` : ''}${refs}`
    }),
    '',
    '## Writing',
    '',
    ...blogs.map((b) => `- [${b.title}](${b.externalUrl})`),
    '- More on Medium: https://medium.com/@minianon',
    '',
    '## Free interview playbooks (open source)',
    '',
    ...resources.map((r) => `- [${r.title}](${r.href}): ${r.description}`),
    '',
    '## Community',
    '',
    ...communities.map((c) => `- [${c.name}](${c.href}): ${c.description}`),
    '',
    '## Videos',
    '',
    ...media.map((m) => `- [${m.title}](https://www.youtube.com/watch?v=${m.youtubeId}): ${m.description}`),
    '',
    '## Contact & profiles',
    '',
    '- Email: tusharbhardwaj2617@gmail.com',
    '- GitHub: https://github.com/minianon',
    '- LinkedIn: https://www.linkedin.com/in/minianon',
    '- X: https://x.com/minianondev',
    '- Mentorship (Topmate): https://topmate.io/tusharbhardwaj',
    '- All links: https://link.minianon.in/tusharbhardwaj',
    '',
    '## Optional',
    '',
    `- [Projects](${SITE}/projects): all projects`,
    `- [Blog](${SITE}/blogs): all articles`,
    `- [Sponsor](${SITE}/sponsors): Buy me a chai (https://buymeachai.ezee.li/minianon) or GitHub Sponsors (https://github.com/sponsors/minianon)`,
    '',
  ]
  return lines.join('\n')
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
