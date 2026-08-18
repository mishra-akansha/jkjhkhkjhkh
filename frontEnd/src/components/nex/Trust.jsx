import { motion } from "framer-motion";
const partners = [
  "Google for Startups",
  "Microsoft for Startups",
  "AWS Activate",
  "GitHub",
  "OpenAI",
  "Startup India",
  "Y Combinator",
];
export function Trust() {
  return (
    <div className="relative border-y border-border/70 bg-card/40 py-12">
      <p className="text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        Trusted technologies powering startup innovation
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 px-5">
        {partners.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="glass rounded-full px-4 py-2 text-sm font-semibold text-foreground/80"
          >
            {p}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
