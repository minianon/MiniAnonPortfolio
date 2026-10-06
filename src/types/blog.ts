export interface BlogPost {
  id: string
  title: string
  readTime: string
  externalUrl: string
  /** Medium clap count — Medium blocks server-side fetching, so update by hand */
  claps?: number
  description?: string
  content?: string
  date?: string
  author?: string
  tags?: string[]
}
