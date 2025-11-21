import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "../types";
import { api } from "../services/api";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for stored token and user data
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.login(email, password);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        router.push("/questions");
      } catch (err) {
        setError("Login failed. Please check your credentials.");
        console.error("Login error:", err);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (email: string, password: string, username: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.register(email, password, username);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        router.push("/questions");
      } catch (err) {
        setError("Registration failed. Please try again.");
        console.error("Registration error:", err);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  }, [router]);

  return { user, loading, error, login, register, logout };
};
