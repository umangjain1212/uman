import { createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";

export type AdminLoginStatus =
  | "idle"
  | "logging-in"
  | "verifying"
  | "success"
  | "error";

export function useAdmin() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const {
    login,
    clear,
    loginStatus: iiStatus,
    identity,
  } = useInternetIdentity();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminStatus, setAdminStatus] = useState<AdminLoginStatus>("idle");
  const [adminError, setAdminError] = useState<string | null>(null);

  // Prevent duplicate post-login checks when loginStatus fires multiple times
  const loginCheckedRef = useRef(false);
  // Prevent session-restore from re-running after explicit login attempt
  const loginAttemptedRef = useRef(false);

  // ── Session restore on mount ──────────────────────────────────────────────
  // Runs once when actor + identity are ready. If a valid II session exists,
  // calls isCallerAdmin() to verify. If no session → clear loading.
  useEffect(() => {
    if (actorFetching || !actor) return;
    if (iiStatus === "initializing") return;
    // If we're in the middle of an explicit login flow, skip session restore
    if (loginAttemptedRef.current) return;

    if (!identity || identity.getPrincipal().isAnonymous()) {
      console.log("[useAdmin] No II session — not authenticated");
      setIsLoading(false);
      setAdminStatus("idle");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const principalText = identity.getPrincipal().toText();
        console.log(
          "[useAdmin] Session restore — checking principal:",
          principalText,
        );
        const isAdmin = await actor.isCallerAdmin();
        console.log("[useAdmin] Session restore isCallerAdmin:", isAdmin);
        if (!cancelled) {
          setIsAuthenticated(isAdmin);
          setAdminStatus(isAdmin ? "success" : "idle");
          if (!isAdmin) setAdminError(null);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("[useAdmin] Session restore error:", err);
        if (!cancelled) {
          setIsLoading(false);
          setAdminStatus("idle");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [actor, actorFetching, iiStatus, identity]);

  // ── Handle successful II login ────────────────────────────────────────────
  // Triggered when II popup completes. Runs first-login-becomes-admin logic
  // then verifies with isCallerAdmin().
  useEffect(() => {
    if (iiStatus !== "success") return;
    if (loginCheckedRef.current) return;
    if (!actor || actorFetching) return;
    if (!identity) return;

    loginCheckedRef.current = true;
    let cancelled = false;

    (async () => {
      try {
        const principalText = identity.getPrincipal().toText();
        console.log("[useAdmin] II login success — principal:", principalText);
        setAdminStatus("verifying");

        // First-login-becomes-admin: if no admin is set, register this caller
        const adminExists = await actor.hasAdmin();
        console.log("[useAdmin] hasAdmin:", adminExists);

        if (!adminExists) {
          console.log("[useAdmin] No admin set — registering caller as admin");
          const setResult = await actor.setAdminPrincipal();
          if (setResult.__kind__ === "err") {
            console.error(
              "[useAdmin] setAdminPrincipal failed:",
              setResult.err,
            );
            if (!cancelled) {
              setAdminError(`Failed to register as admin: ${setResult.err}`);
              setAdminStatus("error");
              setIsLoading(false);
              // Clear II session so they're not left in a broken state
              clear();
            }
            return;
          }
          console.log("[useAdmin] Admin principal set:", setResult.ok);
        }

        // Verify: is this caller the admin?
        const isAdmin = await actor.isCallerAdmin();
        console.log("[useAdmin] isCallerAdmin (post-login):", isAdmin);

        if (!cancelled) {
          if (isAdmin) {
            setIsAuthenticated(true);
            setAdminStatus("success");
            setAdminError(null);
          } else {
            setIsAuthenticated(false);
            setAdminStatus("error");
            setAdminError(
              "Access denied — your Internet Identity is not the admin principal for this store.",
            );
            console.warn("[useAdmin] Not admin — clearing II session");
            clear();
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error("[useAdmin] Post-login check failed:", err);
        if (!cancelled) {
          setAdminStatus("error");
          setAdminError(
            err instanceof Error
              ? err.message
              : "Verification failed. Please try again.",
          );
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [iiStatus, actor, actorFetching, identity, clear]);

  // ── React to II error state ───────────────────────────────────────────────
  useEffect(() => {
    if (iiStatus === "loginError") {
      setAdminStatus("error");
      setAdminError("Internet Identity login failed. Please try again.");
      setIsLoading(false);
      loginAttemptedRef.current = false;
    }
  }, [iiStatus]);

  // ── Login ─────────────────────────────────────────────────────────────────
  const loginWithII = useCallback(() => {
    setAdminError(null);
    setAdminStatus("logging-in");
    setIsLoading(true);
    loginCheckedRef.current = false;
    loginAttemptedRef.current = true;
    login();
  }, [login]);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    console.log("[useAdmin] Logging out");
    setIsAuthenticated(false);
    setAdminStatus("idle");
    setAdminError(null);
    loginCheckedRef.current = false;
    loginAttemptedRef.current = false;
    try {
      clear();
    } catch (err) {
      console.warn("[useAdmin] Logout clear error (ignored):", err);
    }
    window.location.href = "/admin/login";
  }, [clear]);

  return {
    isAuthenticated,
    isLoading: isLoading || actorFetching || iiStatus === "initializing",
    loginWithII,
    logout,
    // adminStatus is the canonical state for AdminLogin UI
    adminStatus,
    adminError,
    // Keep loginStatus exposed for any consumers that need raw II status
    loginStatus: iiStatus,
  };
}
