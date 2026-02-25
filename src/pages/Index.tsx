import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ApproachSection from "@/components/ApproachSection";
import EvolutionSection from "@/components/EvolutionSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import WhySection from "@/components/WhySection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Global Continuous Backgrounds */}
      <div className="fixed inset-0 z-0 bg-aurora" />
      <div className="fixed inset-0 z-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <ApproachSection />
        <EvolutionSection />
        <CapabilitiesSection />
        <WhySection />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
