import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight, FiTrendingUp } from "react-icons/fi";
import { Aurora } from "./Aurora";
import { NexLinkButton } from "./primitives";
const floatCards = [
  {
    emoji: "🚀",
    tag: "Startup Created",
    title: "AI HealthCare",
    sub: "Seeking Seed Funding",
    meta: ["Series Seed", "$250K"],
    pos: "left-0 top-6 sm:-left-6",
    depth: 26,
    delay: 0.1,
  },
  {
    emoji: "💰",
    tag: "Investor Interested",
    title: "John Anderson",
    sub: "Angel Investor",
    meta: ["Interested in your startup"],
    pos: "right-0 top-0 sm:-right-8",
    depth: -34,
    delay: 0.25,
  },
  {
    emoji: "🎯",
    tag: "Mentor Connected",
    title: "Product Strategy",
    sub: "30+ Startups Mentored",
    meta: ["Weekly 1:1"],
    pos: "left-2 bottom-2 sm:left-6",
    depth: 40,
    delay: 0.4,
  },
  {
    emoji: "🔥",
    tag: "Trending Startup",
    title: "EcoVolt",
    sub: "Clean Energy",
    meta: ["Growing 27%"],
    pos: "right-2 bottom-8 sm:right-4",
    depth: -22,
    delay: 0.55,
  },
];
export function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  function onMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  return (
    <div
      id="top"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      <Aurora />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted-foreground"
        >
          <span className="size-1.5 rounded-full bg-success" />
          The startup ecosystem operating system
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-4xl text-[2.75rem] leading-[0.98] font-semibold sm:text-7xl"
        >
          Build. Connect. <span className="gradient-text">Fund.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          The all-in-one ecosystem where founders, investors, mentors, and innovators collaborate to
          turn ideas into successful startups.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <NexLinkButton to="/signup" size="lg">
            Get Started{" "}
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5" />
          </NexLinkButton>
          <NexLinkButton to="/startups" variant="ghost" size="lg">
            Explore Startups
          </NexLinkButton>
        </motion.div>

        {/* Ecosystem visual */}
        <div className="relative mx-auto mt-16 h-[430px] w-full max-w-4xl sm:mt-20 sm:h-[460px]">
          <motion.div
            className="absolute top-1/2 left-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-72"
            style={{ background: "var(--gradient-brand)", filter: "blur(58px)", opacity: 0.55 }}
            animate={{ scale: [1, 1.09, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="glass absolute top-1/2 left-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full sm:size-40"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiTrendingUp className="size-6 text-primary" />
            <p className="mt-2 font-display text-sm font-bold">NEXVENTURE</p>
            <p className="text-[11px] text-muted-foreground">Live ecosystem</p>
          </motion.div>

          {[0, 1].map((ring) => (
            <motion.div
              key={ring}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/70"
              style={{ width: ring ? 420 : 280, height: ring ? 420 : 280 }}
              animate={{ rotate: ring ? -360 : 360 }}
              transition={{ duration: ring ? 60 : 45, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {floatCards.map((card) => (
            <FloatingCard key={card.title} card={card} sx={sx} sy={sy} />
          ))}
        </div>
      </div>
    </div>
  );
}
function FloatingCard({ card, sx, sy }) {
  const x = useTransform(sx, (v) => v * card.depth);
  const y = useTransform(sy, (v) => v * card.depth);
  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${card.pos} w-[15.5rem] max-w-[46%]`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6 + card.delay * 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass gradient-border rounded-2xl p-4 text-left"
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-muted-foreground">
          <span className="text-sm">{card.emoji}</span>
          {card.tag}
        </div>
        <p className="mt-2.5 font-display text-[15px] font-bold">{card.title}</p>
        <p className="text-xs text-muted-foreground">{card.sub}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {card.meta.map((m) => (
            <span
              key={m}
              className="rounded-full bg-secondary px-2 py-1 text-[10px] font-semibold text-secondary-foreground"
            >
              {m}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
