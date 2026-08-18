import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "./primitives";
const stats = [
  { value: 1500, suffix: "+", label: "Startups" },
  { value: 850, suffix: "+", label: "Investors" },
  { value: 600, suffix: "+", label: "Mentors" },
  { value: 30, suffix: "K+", label: "Students" },
  { value: 8, prefix: "$", suffix: "M+", label: "Funding Raised" },
];
function Counter({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} className="font-display text-3xl font-bold sm:text-4xl">
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}
export function Stats() {
  return (
    <Section id="stats" className="py-14 sm:py-20">
      <div className="glass gradient-border grid grid-cols-2 gap-6 rounded-[2rem] px-6 py-10 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="text-center"
          >
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
