import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchCurrentUser,
  googleAuthUser,
  loginUser,
  resetPasswordUser,
  signupUser,
} from "./api/authClient";
const TOKEN_KEY = "nexventure.auth.token";
const USER_KEY = "nexventure.auth.user";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function initSession() {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const cachedUser = localStorage.getItem(USER_KEY);
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        }
        if (token) {
          const freshUser = await fetchCurrentUser(token);
          setUser(freshUser);
          localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
        }
      } catch {
        setUser(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } finally {
        setReady(true);
      }
    }
    initSession();
  }, []);
  const clearError = useCallback(() => setError(null), []);
  const saveAuthSession = (token, nextUser) => {
    setUser(nextUser);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  };
  const signIn = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginUser(email, password);
      saveAuthSession(res.token, res.user);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to sign in. Please try again.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const signUp = useCallback(async (params) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signupUser(params);
      saveAuthSession(res.token, res.user);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to create account. Please try again.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await googleAuthUser();
      saveAuthSession(res.token, res.user);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Google sign in failed. Please try again.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const resetPassword = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      return await resetPasswordUser(email);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to reset password.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const signOut = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);
  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: Boolean(user),
      isLoading,
      error,
      clearError,
      signIn,
      signUp,
      signInWithGoogle,
      resetPassword,
      signOut,
    }),
    [
      user,
      ready,
      isLoading,
      error,
      clearError,
      signIn,
      signUp,
      signInWithGoogle,
      resetPassword,
      signOut,
    ],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
