// context/AuthContext.tsx
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "learner";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Define expected response shape for login
interface LoginResponse {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      router.push(user.role === "admin" ? "/admin" : "/learner");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      await login(email, password);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
