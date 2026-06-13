import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Spotlight } from "@/components/Spotlight";
import { StrategySimulator } from "@/components/StrategySimulator";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { SPOTLIGHTS } from "@/content/site";
import { SCREENSHOTS } from "@/content/assets";

const debtCrusher = SPOTLIGHTS.find((s) => s.id === "debt-crusher")!;
const insights = SPOTLIGHTS.find((s) => s.id === "insights")!;
const coach = SPOTLIGHTS.find((s) => s.id === "coach")!;

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Features />

        <Spotlight
          spotlight={debtCrusher}
          asset={SCREENSHOTS.debtCrusher}
          visual={<StrategySimulator />}
        />
        <Spotlight spotlight={insights} asset={SCREENSHOTS.insights} alt />
        <Spotlight spotlight={coach} asset={SCREENSHOTS.coach} />

        <ComparisonTable />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
