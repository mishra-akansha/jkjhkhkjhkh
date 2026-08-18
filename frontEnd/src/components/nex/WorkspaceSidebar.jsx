import {
  FiBookmark,
  FiCalendar,
  FiCompass,
  FiGrid,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiTrendingUp,
  FiBriefcase,
} from "react-icons/fi";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Logo } from "../../components/nex/Logo";
import { useAuth } from "../../lib/auth";
import { cn } from "../../lib/utils"; 

const NAV_ITEMS = [
  { label: "Dashboard", icon: FiGrid, to: "/dashboard" },
  { label: "Explore", icon: FiCompass, to: "/explore" },
  { label: "My Startup", icon: FiBriefcase },
  { label: "Investors", icon: FiTrendingUp },
  { label: "Events", icon: FiCalendar },
  { label: "Messages", icon: FiMessageSquare },
  { label: "Bookmarks", icon: FiBookmark },
  { label: "Settings", icon: FiSettings },
];

export function WorkspaceSidebar({ open, onClose }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  function handleSignOut() {
    signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
        />
      ) : null}
      <aside
        className={cn(
          "glass fixed inset-y-0 left-0 z-40 flex w-64 flex-col p-4 transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2.5 px-2 py-2">
          <Logo />
          <span className="font-display text-[15px] font-bold tracking-tight">NEXVENTURE</span>
        </div>

        <nav className="mt-6 flex-1 space-y-1" aria-label="Workspace navigation">
          {NAV_ITEMS.map((item) => {
            const active = item.to === pathname;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  onClose?.();
                  if (item.to) navigate({ to: item.to });
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:translate-x-0.5 hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <FiLogOut className="size-4" /> Logout
        </button>
      </aside>
    </>
  );
}
