import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Leaf, Lock, LogIn, User } from "lucide-react";
import { useEffect, useState } from "react";

export function AdminLogin() {
  const { isAuthenticated, isLoading, login } = useAdmin();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid username or password",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const busy = submitting || isLoading;

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

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="text-center space-y-1">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Owner Access Only
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access the admin dashboard.
              </p>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <Label
                htmlFor="admin-username"
                className="text-sm font-medium text-foreground"
              >
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  placeholder="admin"
                  className="pl-9 h-11"
                  disabled={busy}
                  data-ocid="admin-login-username-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="admin-password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="••••••••"
                  className="pl-9 pr-10 h-11"
                  disabled={busy}
                  data-ocid="admin-login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                  data-ocid="admin-login-toggle-password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-3 py-2.5 text-sm"
                data-ocid="admin-login-error-state"
              >
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={busy}
              className="w-full btn-primary h-11 text-base gap-2"
              data-ocid="admin-login-submit-button"
            >
              {busy ? (
                <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {busy ? "Verifying..." : "Login"}
            </Button>
          </form>
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
