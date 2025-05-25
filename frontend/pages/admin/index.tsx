// pages/admin/index.tsx
import  useProtectRoute  from "@/utils/protectRoute";

export default function AdminDashboard() {
  useProtectRoute("admin");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    </div>
  );
}
