// pages/learner/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useProtectRoute from "@/utils/protectRoute";
import api from "@/services/api";
import { Course } from "@/types";

export default function LearnerDashboard() {
  useProtectRoute("learner");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await api.get<Course[]>("/learner/courses"); // ✅ typed here
      setCourses(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);


  if (loading) return <p className="p-4">Loading courses...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Learner</h1>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li
              key={course._id}
              className="border p-4 rounded shadow bg-white hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/learner/${course._id}`)}
            >
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
