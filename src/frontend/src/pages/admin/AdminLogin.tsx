import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Leaf, Loader2, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

export function AdminLogin() {
  const { isAuthenticated, isLoading, loginWithII, adminStatus, adminError } =
    useAdmin();
  const navigate = useNavigate();

  // Redirect immediately when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const isLoggingIn =
    adminStatus === "logging-in" || adminStatus === "verifying";
  const busy = isLoading || isLoggingIn;

  const statusMsg =
    adminStatus === "logging-in"
      ? "Waiting for Internet Identity..."
      : adminStatus === "verifying"
        ? "Verifying admin access..."
        : null;

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-elevated p-8 space-y-8 animate-fade-in-scale">
          {/* Brand */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <span
                className="font-serif text-3xl font-semibold tracking-widest text-primary select-none"
                style={{ letterSpacing: "0.18em" }}
              >
                Farm&nbsp;72
              </span>
              <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Login section */}
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Owner Access Only
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in with your Internet Identity to access the admin
                dashboard.
              </p>
            </div>

            {/* II Info Box */}
            <div className="flex gap-3 items-start bg-primary/5 border border-primary/20 rounded-xl p-4">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80 leading-relaxed">
                Authentication is handled via{" "}
                <strong className="text-foreground">Internet Identity</strong> —
                the secure, privacy-preserving login system for the Internet
                Computer. No password needed.
              </p>
            </div>

            {/* Status message — shown while logging in / verifying */}
            {statusMsg && !adminError && (
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm border bg-muted border-border text-muted-foreground"
                data-ocid="admin-login-loading-state"
              >
                <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />
                <span>{statusMsg}</span>
              </div>
            )}

            {/* Success flash before redirect */}
            {adminStatus === "success" && isAuthenticated && (
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm border bg-primary/10 border-primary/20 text-primary"
                data-ocid="admin-login-success-state"
              >
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>Access granted — redirecting…</span>
              </div>
            )}

            {/* Error message */}
            {adminError && (
              <div
                className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-3 py-2.5 text-sm"
                data-ocid="admin-login-error-state"
              >
                <span className="font-medium">{adminError}</span>
              </div>
            )}

            {/* Connect Button */}
            <Button
              type="button"
              onClick={loginWithII}
              disabled={busy}
              className="w-full btn-primary h-11 text-base gap-2"
              data-ocid="admin-login-submit-button"
            >
              {busy ? (
                <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              {busy
                ? (statusMsg ?? "Connecting…")
                : "Connect with Internet Identity"}
            </Button>
          </div>
        </div>

        {/* Back link */}
        <p className="text-center mt-4 text-sm text-muted-foreground">
          <a
            href="/"
            className="hover:text-foreground transition-smooth underline underline-offset-2"
          >
            ← Back to Farm72 website
          </a>
        </p>
      </div>
    </div>
  );
}
