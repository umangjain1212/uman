import { b as useActor, r as reactExports, f as createActor } from "./index-0GmdxHi9.js";
const TOKEN_KEY = "farm72_admin_token";
function useAdmin() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const [sessionToken, setSessionToken] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (actorFetching || !actor) return;
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setIsLoading(false);
      return;
    }
    actor.validateAdminSession(stored).then((valid) => {
      if (valid) {
        setSessionToken(stored);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }).catch(() => {
      localStorage.removeItem(TOKEN_KEY);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [actor, actorFetching]);
  const login = reactExports.useCallback(
    async (username, password) => {
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
    [actor]
  );
  const logout = reactExports.useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && actor) {
      try {
        await actor.adminLogout(token);
      } catch {
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    setSessionToken(null);
    setIsAuthenticated(false);
    window.location.href = "/admin/login";
  }, [actor]);
  const changePassword = reactExports.useCallback(
    async (currentPassword, newPassword) => {
      if (!actor) throw new Error("Not ready");
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("Not authenticated");
      const result = await actor.changeAdminPassword(
        token,
        currentPassword,
        newPassword
      );
      if (result.__kind__ === "err") {
        throw new Error(result.err ?? "Failed to change password");
      }
    },
    [actor]
  );
  return {
    isAuthenticated,
    sessionToken,
    isLoading: isLoading || actorFetching,
    login,
    logout,
    changePassword
  };
}
export {
  useAdmin as u
};
