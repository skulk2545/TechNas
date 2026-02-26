import { motion } from "framer-motion";
import { Layers, Link2, BarChart3, Settings2, ArrowUpRight, Activity } from "lucide-react";

const points = [
  { icon: Layers, title: "Integrated Commerce Systems", desc: "We design unified platforms where sales, fulfillment, and customer management operate as one." },
  { icon: Settings2, title: "Structured Operations", desc: "Every workflow is mapped, optimized, and connected — giving you clarity and control at every level." },
  { icon: Link2, title: "Connected Infrastructure", desc: "Inventory, payments, reporting, and logistics wired together. No gaps, no blind spots." },
  { icon: BarChart3, title: "Scalable Foundations", desc: "Architecture built for where you're going, not just where you are." },
  { icon: ArrowUpRight, title: "Evolving Systems", desc: "Your systems grow with your business. We plan for iteration from day one." },
  {
    icon: Activity,
    title: "Intelligent Visibility",
    desc: "Real-time insights across your operations — so decisions are driven by signal, not guesswork."
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const ApproachSection = () => (
  <section id="approach" className="relative py-24 md:py-32">
    <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
    <div className="container relative mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">The TechNas Approach</p>
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl">
          <span className="text-bloom inline-block cursor-default">From fragmented tools to</span>{" "}
          <span className="text-gradient text-bloom-gradient inline-block cursor-default">unified systems.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          We don't bolt things together. We architect coherent systems where every component serves the whole.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-4xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {points.map((p) => (
          <motion.div
            key={p.title}
            variants={cardVariants}
            className="card-bloom rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <p.icon size={22} className="text-primary" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-bloom cursor-default">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ApproachSection;
