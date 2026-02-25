import { motion } from "framer-motion";
import { Unplug, HandMetal, Eye, TrendingDown, AlertTriangle, Cloud } from "lucide-react";

const problems = [
  { icon: Unplug, title: "Disconnected Tools", desc: "Sales in one place, inventory in another, reporting nowhere. Your stack doesn't talk." },
  { icon: HandMetal, title: "Manual Processes", desc: "Critical workflows depend on spreadsheets, copy-paste, and human memory." },
  { icon: TrendingDown, title: "Operational Drag", desc: "Growth slows when every new order or product adds friction instead of flow." },
  { icon: Eye, title: "Zero Visibility", desc: "No single view of sales, inventory, or workflow status. Decisions are guesses." },
  { icon: AlertTriangle, title: "Systems That Break", desc: "What worked for 10 orders collapses at 1,000. Scale exposes every crack." },
  { icon: Cloud, title: "Local Management", desc: "Your team is stuck in spreadsheets, emails, and disconnected systems. They can't see the whole picture." },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const ProblemSection = () => (
  <section className="relative py-24 md:py-32">
    <div className="absolute inset-0 bg-radial-glow-strong opacity-30 pointer-events-none" />
    <div className="container relative mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">The Problem</p>
        <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
          <span className="text-bloom inline-block cursor-default">Most businesses don't have a marketing problem.</span>
          <br />
          <span className="text-muted-foreground text-bloom inline-block cursor-default">They have a structure problem.</span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-4xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {problems.map((p) => (
          <motion.div
            key={p.title}
            variants={cardVariants}
            className="card-bloom group rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
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

export default ProblemSection;
