import type { Metadata } from "next"
import OnekoCat from "@/components/OnekoCat"
import NewHeroSection from "@/components/HomeContent"

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
      <div>
        <OnekoCat />
        <NewHeroSection />
      </div>
  );
}
