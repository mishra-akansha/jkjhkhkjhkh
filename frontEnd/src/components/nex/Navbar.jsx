import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { cn } from "../../lib/utils";
import { NexLinkButton } from "./primitives";
import { Logo } from "./Logo";
const nav = [
  { label: "Home", hash: "top" },
  { label: "Explore", hash: "features" },
  { label: "Startups", to: "/startups" },
  { label: "Investors", hash: "investors" },
  { label: "Mentors", hash: "voices" },
  { label: "Events", hash: "cta" },
  { label: "About", hash: "stats" },
];
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5",
          scrolled ? "glass h-14 shadow-[var(--shadow-soft)]" : "h-16 bg-transparent",
        )}
      >
        <Link to="/" hash="top" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-[15px] font-bold tracking-tight">NEXVENTURE</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to || "/"}
              hash={item.to ? undefined : item.hash}
              className="relative rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <NexLinkButton to="/login" variant="subtle" size="sm">
            Login
          </NexLinkButton>
          <NexLinkButton to="/signup" size="sm">
            Get Started
          </NexLinkButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-card/70 md:hidden"
        >
          {open ? <HiX size={18} /> : <HiOutlineMenuAlt4 size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden"
          >
            <div className="grid grid-cols-2 gap-1">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to || "/"}
                  hash={item.to ? undefined : item.hash}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <NexLinkButton to="/login" variant="ghost" size="sm" className="flex-1">
                Login
              </NexLinkButton>
              <NexLinkButton to="/signup" size="sm" className="flex-1">
                Get Started
              </NexLinkButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
