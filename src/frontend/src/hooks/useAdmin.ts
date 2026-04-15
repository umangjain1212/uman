import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";

const TOKEN_KEY = "farm72_admin_token";

export function useAdmin() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: restore token from localStorage and validate with backend
  useEffect(() => {
    if (actorFetching || !actor) return;

    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setIsLoading(false);
      return;
    }

    actor
      .validateAdminSession(stored)
      .then((valid) => {
        if (valid) {
          setSessionToken(stored);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [actor, actorFetching]);

  const login = useCallback(
    async (username: string, password: string) => {
      if (!actor) throw new Error("Not ready");
      const result = await actor.adminLogin(username, password);
      if (result.__kind__ === "ok") {
        const token = result.ok;
        localStorage.setItem(TOKEN_KEY, token);
        setSessionToken(token);
        setIsAuthenticated(true);
      } else {
        throw new Error(result.err ?? "Invalid username or password");
      }
    },
    [actor],
  );

  const logout = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && actor) {
      try {
        await actor.adminLogout(token);
      } catch {
        // ignore errors during logout
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    setSessionToken(null);
    setIsAuthenticated(false);
    window.location.href = "/admin/login";
  }, [actor]);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!actor) throw new Error("Not ready");
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("Not authenticated");
      const result = await actor.changeAdminPassword(
        token,
        currentPassword,
        newPassword,
      );
      if (result.__kind__ === "err") {
        throw new Error(result.err ?? "Failed to change password");
      }
    },
    [actor],
  );

  return {
    isAuthenticated,
    sessionToken,
    isLoading: isLoading || actorFetching,
    login,
    logout,
    changePassword,
  };
}
