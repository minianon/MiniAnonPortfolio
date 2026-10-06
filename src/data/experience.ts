export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements?: string[];
  href?: string;
  logoUrl?: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "Vitti Capital",
    position: "Python Developer",
    duration: "Mar 2026 – Present",
    description: "Built a real-time options trading dashboard and developed AI-powered financial market intelligence pipelines.",
    achievements: [
      "Built a real-time options trading dashboard (OptionScope) using WebSockets, enabling sub-second tracking of prices, Greeks, and multi-leg strategies across 150+ symbols.",
      "Designed a high-performance, serverless architecture with optimized data handling and edge rewrites, ensuring scalable, low-latency communication without backend overhead.",
      "Developed an AI-powered market intelligence pipeline using LLMs to generate summaries, sentiment scores, and actionable insights from financial announcements in near real-time."
    ],
    href: "https://vitti.capital",
    logoUrl: "/vitti.jpeg",
  },
  {
    company: "topmate.io",
    position: "Industry Evangelist",
    duration: "Sep 2024 – Present",
    description: "Conducted technical mentoring sessions to guide peers and students through resume building and interview strategy.",
    achievements: [
      "Delivered 300+ mentorship sessions helping students and developers improve resumes, prepare for technical interviews, and navigate software engineering careers.",
      "Achieved Top 0.1% mentor ranking with a 4.67/5 rating, earning recognition such as People’s Choice and Community Care badges.",
      "Provided personalized guidance on problem-solving frameworks, interview strategy, and confidence-building to improve interview readiness."
    ],
    href: "https://topmate.io/tusharbhardwaj",
    logoUrl: "/topmate.jpeg",
  },
  {
    company: "Microsoft",
    position: "Software Engineering Intern",
    duration: "Jun 2025 – Aug 2025",
    description: "Designed and benchmarked container control-plane horizontal scaling Kubernetes controllers in Go.",
    achievements: [
      "Designed and built a shard-aware Kubernetes controller in Go to enable horizontal scaling of control-plane reconciliation workloads.",
      "Improved reconciliation throughput by optimizing informer reuse and event-driven processing, reducing unnecessary API server calls.",
      "Performed performance benchmarking and load testing on Kubernetes clusters to identify system bottlenecks and improve controller reliability."
    ],
    href: "https://microsoft.com",
    logoUrl: "/microsoft.png",
  }
]
