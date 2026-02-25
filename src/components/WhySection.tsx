import { motion } from "framer-motion";
import { Check } from "lucide-react";

const differentiators = [
  { title: "Structured Architecture", desc: "Every system we build follows a deliberate, documented structure — no spaghetti, no shortcuts." },
  { title: "Managed Partnership", desc: "We don't hand off and disappear. StepUp is a long-term partner in your operational evolution." },
  { title: "Clean, Modular Design", desc: "Components that can be independently upgraded, replaced, or extended without disrupting the whole." },
  { title: "Strategic Implementation", desc: "We start with your business logic, not a template. Every decision is intentional." },
  { title: "Built for Scale", desc: "Architecture that handles growth gracefully — from early traction to enterprise-grade demand." },
  { title: "Operational Maturity", desc: "We build toward operational independence, not ongoing dependence on external teams." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

const WhySection = () => (
  <section id="why" className="relative py-24 md:py-32">
    <div className="absolute inset-0 bg-radial-glow opacity-20 pointer-events-none" />
    <div className="container relative mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Why StepUp</p>
        <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
          <span className="text-bloom inline-block cursor-default">Engineered for businesses that</span>{" "}
          <span className="text-gradient text-bloom-gradient inline-block cursor-default">think in systems.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          We work with organizations that understand the difference between a tool and an infrastructure. StepUp is for teams ready to build the right way.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-3xl grid gap-5 sm:grid-cols-2"
      >
        {differentiators.map((d) => (
          <motion.div
            key={d.title}
            variants={cardVariants}
            className="card-bloom rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                <Check size={14} className="text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold text-bloom cursor-default">{d.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhySection;
