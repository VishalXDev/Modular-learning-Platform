// utils/protectRoute.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

export default function useProtectRoute(requiredRole?: "admin" | "learner") {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (requiredRole && user.role !== requiredRole) {
      router.push("/");
    }
  }, [user, requiredRole, router]);
}
