import { motion } from "framer-motion";
import { ShoppingCart, Workflow, Package, PieChart, Puzzle, ShieldCheck } from "lucide-react";

const capabilities = [
  { icon: ShoppingCart, title: "Commerce Infrastructure", desc: "End-to-end commerce systems built for performance, reliability, and growth — not templates." },
  { icon: Workflow, title: "Operations Management", desc: "Structured workflows that eliminate guesswork and bring order to every process." },
  { icon: Package, title: "Inventory & Order Systems", desc: "Real-time inventory tracking, order management, and fulfillment orchestration in one place." },
  { icon: PieChart, title: "Financial & Reporting Clarity", desc: "Clean financial data, automated reporting, and dashboards that surface what matters." },
  { icon: Puzzle, title: "Modular Expansion", desc: "System architecture designed for modularity — add capabilities as your needs evolve." },
  {
    icon: ShieldCheck,
    title: "System Reliability",
    desc: "Monitoring, redundancy, and safeguards built in to ensure uptime and operational continuity."
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

const CapabilitiesSection = () => (
  <section id="capabilities" className="relative py-24 md:py-32">
    <div className="absolute inset-0 bg-radial-glow-strong opacity-30 pointer-events-none" />
    <div className="container relative mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Core Capabilities</p>
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl text-bloom cursor-default">
          Outcomes over features.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Every capability we deliver is measured by the operational clarity and control it creates for your business.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-4xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {capabilities.map((c) => (
          <motion.div
            key={c.title}
            variants={cardVariants}
            className="card-bloom rounded-xl border border-border bg-card/70 backdrop-blur-sm p-8 text-center"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <c.icon size={26} className="text-primary" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-bloom cursor-default">{c.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CapabilitiesSection;
