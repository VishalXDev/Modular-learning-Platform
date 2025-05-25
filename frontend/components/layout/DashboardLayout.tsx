import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6 text-2xl font-bold">Modular Learning Platform</header>
      <main>{children}</main>
    </div>
  );
}