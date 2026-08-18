import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiBell, FiSearch, FiUsers, FiMenu } from "react-icons/fi";
import { Aurora } from "../../components/nex/Aurora";
import { WorkspaceSidebar } from "../../components/nex/WorkspaceSidebar";
import { useAuth } from "../../lib/auth";
import { cn } from "../../lib/utils";
import { USER_ROLE_BADGES } from "../../utils/enums";
export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NEXVENTURE" },
      { name: "description", content: "Your NEXVENTURE workspace overview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});
function Panel({ title, action, className, children }) {
  return (
    <div className={cn("glass gradient-border rounded-3xl p-5", className)}>
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold">{title}</p>
        {action ? <span className="text-xs font-semibold text-primary">{action}</span> : null}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
function DashboardPage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const initials = (user?.name ?? "N")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="relative flex min-h-screen">
      <Aurora intensity={0.35} />

      <WorkspaceSidebar open={open} onClose={() => setOpen(false)} />

      <div className="relative flex-1 lg:pl-64">
        <header className="glass sticky top-0 z-30 flex h-16 items-center gap-3 px-4 sm:px-6">
          <button
            aria-label="Toggle sidebar"
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-xl border border-border bg-card lg:hidden"
          >
            <FiMenu className="size-4" />
          </button>
          <label className="relative hidden flex-1 items-center sm:flex">
            <FiSearch className="absolute left-3 size-4 text-muted-foreground" />
            <input
              placeholder="Search startups, investors, mentors…"
              aria-label="Search"
              className="h-10 w-full max-w-md rounded-xl border border-border bg-card pr-3 pl-9 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/12"
            />
          </label>{" "}
          <div className="ml-auto flex items-center gap-2.5">
            <button
              aria-label="Notifications"
              className="relative flex size-9 items-center justify-center rounded-xl border border-border bg-card"
            >
              <FiBell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card py-1.5 pr-3 pl-1.5">
              <span className="flex size-7 items-center justify-center rounded-lg [background-image:var(--gradient-brand)] text-[11px] font-bold text-primary-foreground">
                {initials}
              </span>
              <div className="hidden flex-col sm:flex">
                <span className="text-xs font-semibold leading-tight">{user?.name}</span>
                <span className="text-[10px] text-muted-foreground capitalize leading-none">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="relative space-y-5 p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass gradient-border flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
                {user?.role ? `${USER_ROLE_BADGES[user.role]} Workspace` : "Member Workspace"}
              </div>
              <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Welcome back, <span className="gradient-text">{user?.name}</span>
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Signed in as <span className="text-foreground font-medium">{user?.email}</span> —
                Here's what's moving in your ecosystem today.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Profile completion</span>
                <span>75%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="h-full rounded-full [background-image:var(--gradient-brand)]"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            <Panel title="Notifications" action="Mark all read">
              <div className="space-y-3">
                {[
                  ["💰", "New investor interest on your profile"],
                  ["🎯", "Mentor session request accepted"],
                  ["👥", "2 new applications to review"],
                ].map(([e, t]) => (
                  <div key={t} className="flex gap-3 rounded-xl bg-secondary/70 px-3 py-2.5">
                    <span>{e}</span>
                    <p className="text-sm">{t}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Recent activity" action="View all">
              <div className="space-y-3">
                {[
                  ["Profile viewed by Acme Ventures", "18m ago"],
                  ["Bookmarked EcoVolt", "2h ago"],
                  ["Joined Campus Chapter — BLR", "Yesterday"],
                ].map(([t, time]) => (
                  <div key={t} className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-snug">{t}</p>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{time}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Upcoming events" action="Calendar">
              <div className="space-y-3">
                {[
                  ["Demo Day — Seed Cohort", "Aug 12 · 5:00 PM"],
                  ["Investor AMA: SaaS Metrics", "Aug 18 · 7:30 PM"],
                  ["Mentor Office Hours", "Aug 22 · 11:00 AM"],
                ].map(([t, when]) => (
                  <div key={t} className="rounded-xl border border-border/70 bg-card/70 p-3">
                    <p className="text-sm font-semibold">{t}</p>
                    <p className="text-[11px] text-muted-foreground">{when}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Recommended startups" action="Explore" className="lg:col-span-2">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["EcoVolt", "Clean Energy", "+27%"],
                  ["Nimbus AI", "Dev Tools", "+19%"],
                  ["Curelink", "HealthTech", "+34%"],
                  ["Payloop", "Fintech", "+12%"],
                ].map(([n, s, g]) => (
                  <motion.div
                    key={n}
                    whileHover={{ y: -4 }}
                    className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{n}</p>
                      <p className="text-[11px] text-muted-foreground">{s}</p>
                    </div>
                    <span className="text-xs font-semibold text-success">{g}</span>
                  </motion.div>
                ))}
              </div>
            </Panel>

            <Panel title="Recommended investors" action="See all">
              <div className="space-y-2.5">
                {[
                  ["John Anderson", "Angel · HealthTech"],
                  ["Lumen Capital", "Pre-seed · SaaS"],
                  ["Rita Menon", "Angel · Climate"],
                ].map(([n, s]) => (
                  <div
                    key={n}
                    className="flex items-center gap-3 rounded-xl bg-secondary/70 px-3 py-2.5"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full [background-image:var(--gradient-brand)] text-[11px] font-bold text-primary-foreground">
                      {n
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{n}</p>
                      <p className="text-[11px] text-muted-foreground">{s}</p>
                    </div>
                    <FiUsers className="ml-auto size-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </main>
      </div>
    </div>
  );
}
