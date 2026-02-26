import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkGrid from "@/components/NetworkGrid";
import { ConsultationModal } from "./ConsultationModal";

const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16">
      {/* Subtle section glow */}
      <div className="absolute inset-0 bg-radial-glow-strong opacity-40 pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 blur-xl"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float-particle ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Network graphic - more visible */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <NetworkGrid />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm lg:mb-8 lg:px-6 lg:py-2 lg:text-base lg:gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow lg:h-2.5 lg:w-2.5" />
            Creating Your Digital Presence
          </div>

          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-[6rem] lg:max-w-6xl">
            <span className="text-bloom inline-block cursor-default">
              We don't build websites.
            </span>
            <br />
            {/* Added pb-2 here to prevent descender clipping on the gradient */}
            <span className="text-gradient text-bloom-gradient inline-block cursor-default pb-2">
              We engineer systems.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mt-8 lg:max-w-4xl lg:text-2xl">
            TechNas designs and implements structured commerce and operational systems that give your business clarity, control, and the foundation to grow.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:mt-14 lg:gap-6">
            <Button
              size="lg"
              className="glow-md gap-2 px-8 text-base lg:h-14 lg:px-10 lg:text-lg"
              onClick={() => setModalOpen(true)}
            >
              Talk to TechNas
              <ArrowRight size={16} className="lg:h-5 lg:w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-primary/20 px-8 text-base text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300 lg:h-14 lg:px-10 lg:text-lg"
              onClick={() => document.getElementById("approach")?.scrollIntoView({ behavior: "smooth" })}
            >
              See Our Approach
            </Button>
          </div>
        </motion.div>
      </div>

      <ConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default HeroSection;