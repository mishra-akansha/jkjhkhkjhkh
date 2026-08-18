import { motion } from "framer-motion";
import { FiCompass, FiDollarSign, FiUsers, FiZap } from "react-icons/fi";
import { HiOutlineLightBulb, HiOutlineSparkles } from "react-icons/hi2";
import { Section, SectionHeading } from "./primitives";
const features = [
  {
    icon: FiCompass,
    title: "Discover Startups",
    body: "Browse curated ventures by stage, sector and traction with signal-rich profiles.",
  },
  {
    icon: FiDollarSign,
    title: "Find Investors",
    body: "Match with angels and funds actively writing cheques in your category.",
  },
  {
    icon: HiOutlineLightBulb,
    title: "Connect Mentors",
    body: "Book operators who have shipped, scaled and exited before you.",
  },
  {
    icon: FiUsers,
    title: "Build Teams",
    body: "Hire students and early talent hungry to join founding teams.",
  },
  {
    icon: FiZap,
    title: "Pitch Events",
    body: "Apply to demo days and live pitch rooms with real capital in the room.",
  },
  {
    icon: HiOutlineSparkles,
    title: "AI Recommendations",
    body: "Intelligent matching surfaces the right people at the right moment.",
  },
];
export function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Platform"
        title={
          <>
            Everything an ecosystem needs, <span className="gradient-text">in one surface</span>
          </>
        }
        subtitle="Six core building blocks designed for founders, investors, mentors and students."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="glass gradient-border group relative overflow-hidden rounded-3xl p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
          >
            <div
              className="pointer-events-none absolute -top-24 -right-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: "var(--gradient-brand)" }}
            />
            <div className="relative">
              <span className="flex size-11 items-center justify-center rounded-2xl [background-image:var(--gradient-brand)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <f.icon className="size-5 text-primary-foreground" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
