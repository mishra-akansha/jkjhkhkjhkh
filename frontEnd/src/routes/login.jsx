import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, Divider, Field, GoogleButton } from "../components/nex/AuthShell";
import { NexButton } from "../components/nex/primitives";
import { useAuth } from "../lib/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader, 
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { DEMO_AUTH_ACCOUNTS, USER_ROLE_BADGES, USER_ROLE_LABELS } from "../utils/enums";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — NEXVENTURE" },
      { name: "description", content: "Sign in to your NEXVENTURE account and continue building." },
      { property: "og:title", content: "Login — NEXVENTURE" },
      { property: "og:description", content: "Sign in to your NEXVENTURE account." },
    ],
  }),
  component: LoginPage,
});
const DEMO_ACCOUNTS = DEMO_AUTH_ACCOUNTS.map((account) => ({
  id: account.id,
  name: account.name,
  role: USER_ROLE_LABELS[account.role],
  email: account.email,
  pass: account.password,
  badge: USER_ROLE_BADGES[account.role],
}));
function LoginPage() {
  const { signIn, signInWithGoogle, resetPassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // Forgot password modal state
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    clearError();
    const next = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    try {
      await signIn(email, password);
      navigate({ to: "/dashboard" });
    } catch {
      // Error handled by AuthContext and displayed below
    }
  }
  async function handleQuickLogin(accountEmail, accountPass) {
    clearError();
    setEmail(accountEmail);
    setPassword(accountPass);
    try {
      await signIn(accountEmail, accountPass);
      navigate({ to: "/dashboard" });
    } catch {
      /* handled by auth state */
    }
  }
  async function handleGoogleLogin() {
    clearError();
    try {
      await signInWithGoogle();
      navigate({ to: "/dashboard" });
    } catch {
      /* handled */
    }
  }
  async function handleResetSubmit(e) {
    e.preventDefault();
    setResetError(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(resetEmail)) {
      setResetError("Please enter a valid email address.");
      return;
    }
    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetSuccess(true);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : "Failed to request password reset.");
    } finally {
      setResetLoading(false);
    }
  }
  return (
    <AuthShell
      title="Welcome back to the ecosystem."
      lead="Pick up where you left off — your investors, mentors and applications are waiting."
      bullets={["Live deal flow", "Mentor sessions", "Team applications"]}
    >
      <h1 className="text-2xl font-semibold">Welcome Back</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">Log in to your NEXVENTURE account.</p>

      {error ? (
        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive font-medium flex items-center justify-between">
          <span>{error}</span>
          <button onClick={clearError} className="ml-2 text-xs hover:underline opacity-80">
            Dismiss
          </button>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <Field
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) clearError();
          }}
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          error={errors.password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) clearError();
          }}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" className="size-4 accent-[var(--brand)] rounded" /> Remember me
          </label>
          <button
            type="button"
            onClick={() => {
              setResetEmail(email);
              setResetSuccess(false);
              setResetError(null);
              setResetOpen(true);
            }}
            className="text-sm font-semibold text-primary hover:underline bg-transparent border-0 p-0 cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        <NexButton type="submit" className="w-full" size="md" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Authenticating...
            </span>
          ) : (
            "Login"
          )}
        </NexButton>
      </form>

      {/* Visible demo credentials keep local review frictionless. */}
      <div className="mt-6 rounded-2xl border border-border/80 bg-secondary/40 p-3.5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] uppercase">Demo credentials</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Password for every account:{" "}
              <span className="font-mono text-foreground">password123</span>
            </p>
          </div>
          <span className="rounded-full bg-success/12 px-2 py-1 text-[10px] font-bold text-success">
            READY
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.id}
              type="button"
              onClick={() => handleQuickLogin(acc.email, acc.pass)}
              disabled={isLoading}
              className="rounded-xl border border-border/60 bg-card px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:shadow-sm disabled:opacity-60"
            >
              <span className="block text-xs font-bold">{acc.badge}</span>
              <span className="mt-1 block truncate font-mono text-[10px] text-muted-foreground">
                ID: {acc.email}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Select any account to sign in instantly.
        </p>
      </div>

      <Divider />
      <GoogleButton label="Continue with Google" onClick={handleGoogleLogin} disabled={isLoading} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-primary hover:underline">
          Create Account
        </Link>
      </p>

      {/* Forgot Password Modal */}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter your email address to request a password reset for your account.
            </DialogDescription>
          </DialogHeader>

          {resetSuccess ? (
            <div className="py-4 text-center space-y-3">
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-success/20 text-success text-xl">
                ✓
              </div>
              <p className="text-sm font-medium text-foreground">
                Reset link sent! Please check your inbox for <strong>{resetEmail}</strong>.
              </p>
              <NexButton onClick={() => setResetOpen(false)} className="w-full mt-4">
                Done
              </NexButton>
            </div>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4 pt-2">
              {resetError ? (
                <p className="text-xs text-destructive font-medium">{resetError}</p>
              ) : null}
              <Field
                label="Email address"
                type="email"
                placeholder="you@company.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResetOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <NexButton type="submit" disabled={resetLoading}>
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </NexButton>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AuthShell>
  );
}
