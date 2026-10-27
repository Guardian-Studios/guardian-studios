import { useState } from "react";
import { site } from "./config/site";
import { SkipLink } from "./components/SkipLink/SkipLink";
import { SiteFooter } from "./components/SiteFooter/SiteFooter";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { StudioSection } from "./components/StudioSection/StudioSection";
import { TeamSection } from "./components/TeamSection/TeamSection";
import { WorkSection } from "./components/WorkSection/WorkSection";
import { ProcessSection } from "./components/ProcessSection/ProcessSection";
import { MvpSection } from "./components/MvpSection/MvpSection";
import { ContactSection } from "./components/ContactSection/ContactSection";
import { MotionProvider } from "./components/MotionProvider/MotionProvider";

export default function App() {
  const [service, setService] = useState<string>(site.services[0]);
  return (
    <MotionProvider>
      <SkipLink />
      <main id="contenido">
        <HeroSection service={service} onServiceChange={setService} />
        <StudioSection />
        <TeamSection />
        <WorkSection />
        <ProcessSection />
        <MvpSection onServiceChange={setService} />
        <ContactSection service={service} />
      </main>
      <SiteFooter />
    </MotionProvider>
  );
}
