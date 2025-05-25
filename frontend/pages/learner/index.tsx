// pages/learner/index.tsx
import useProtectRoute from "@/utils/protectRoute";

export default function LearnerDashboard() {
  useProtectRoute("learner");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Learner Dashboard</h1>
      <p>Welcome! View your enrolled courses and progress here.</p>
    </div>
  );
}
