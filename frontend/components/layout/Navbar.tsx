// components/layout/Navbar.tsx
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link href={user?.role === "admin" ? "/admin" : "/learner"}>
          {user?.role === "admin" ? "Admin Panel" : "Learning Portal"}
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {user && <span className="text-sm">Hi, {user.name}</span>}
        <button
          onClick={logout}
          className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
