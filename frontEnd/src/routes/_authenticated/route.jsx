import { useEffect } from "react";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth";
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  
  const { ready, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && !isAuthenticated) navigate({ to: "/login", replace: true });
  }, [ready, isAuthenticated, navigate]);
  if (!ready || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }
  return <Outlet />;
}
