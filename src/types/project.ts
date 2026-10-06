export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  date?: string;
  tweetUrl?: string;
}
