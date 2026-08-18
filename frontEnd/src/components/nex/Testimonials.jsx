import { motion } from "framer-motion";
import { Section, SectionHeading } from "./primitives";
const testimonials = [
  {
    quote:
      "We closed our seed round in six weeks. NEXVENTURE put the right investors in front of us before we even finished the deck.",
    name: "Ananya Rao",
    role: "Founder, AI HealthCare",
    tag: "Founder",
  },
  {
    quote:
      "The signal quality is unreal. I see traction data, mentor endorsements and team depth before the first call.",
    name: "John Anderson",
    role: "Angel Investor",
    tag: "Investor",
  },
  {
    quote:
      "I mentor five companies here. Scheduling, context and follow-ups are all handled — I just show up and help.",
    name: "Daniel Okafor",
    role: "Product Strategy Mentor",
    tag: "Mentor",
  },
  {
    quote:
      "I joined a two-person startup as their first design hire in my final semester. Nothing else came close.",
    name: "Meera Shah",
    role: "Student, Design",
    tag: "Student",
  },
];
export function Testimonials() {
  return (
    <Section id="voices">
      <SectionHeading
        eyebrow="Voices"
        title="Built for every side of the table"
        subtitle="Founders, investors, mentors and students — one shared ecosystem."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className="glass gradient-border rounded-3xl p-6 transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              {t.tag}
            </span>
            <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/90">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full [background-image:var(--gradient-brand)] text-xs font-bold text-primary-foreground">
                {t.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
