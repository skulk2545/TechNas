import { motion } from "framer-motion";

const stages = [
  { phase: "01", title: "Digital Foundation", desc: "Structured commerce presence with clean data architecture and reliable infrastructure." },
  { phase: "02", title: "Operational Integration", desc: "Sales, inventory, and fulfillment systems connected into a single operational view." },
  { phase: "03", title: "Process Automation", desc: "Repetitive workflows automated. Your team focuses on decisions, not data entry." },
  { phase: "04", title: "Advanced Analytics", desc: "Real-time dashboards and reporting that surface insights for faster, smarter moves." },
  { phase: "05", title: "Intelligence Layer", desc: "Predictive capabilities and adaptive systems that keep you ahead of the curve." },
];

const EvolutionSection = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    <div className="container mx-auto px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">How It Evolves</p>
        <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
          Long-term infrastructure, <span className="text-muted-foreground">not short-term projects.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          StepUp systems are designed for progression. Each phase builds on the last, creating compounding operational advantage.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

        <div className="space-y-12">
          {stages.map((s, i) => (
            <motion.div
              key={s.phase}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex items-start gap-6 md:gap-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Node */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background font-display text-sm font-bold text-primary md:absolute md:left-1/2 md:-translate-x-1/2">
                {s.phase}
              </div>

              {/* Content */}
              <div className={`md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <h3 className="mb-1 font-display text-lg font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EvolutionSection;
