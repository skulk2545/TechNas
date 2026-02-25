import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "./ConsultationModal";

const FinalCTA = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            Structure. Control. <span className="text-gradient">Scale.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Build the system your business deserves. Let's start with a conversation about where you are and where you need to go.
          </p>
          <Button size="lg" className="mt-10 glow-md gap-2 px-10 text-base" onClick={() => setModalOpen(true)}>
            Request a Consultation
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>

      <ConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default FinalCTA;
