// pages/learner/courses.tsx
import { useEffect, useState } from "react";
import useProtectRoute from "@/utils/protectRoute";
import api from "@/services/api";
import { useRouter } from "next/router";

interface Course {
  _id: string;
  title: string;
  description?: string;
}

export default function LearnerCourses() {
  useProtectRoute("learner");
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await api.get("/learner/courses"); // your backend endpoint for enrolled courses
      setCourses(res.data);
    } catch {
      alert("Failed to load courses");
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Enrolled Courses</h1>
      {courses.length === 0 ? (
        <p>You are not enrolled in any courses yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li
              key={course._id}
              onClick={() => router.push(`/learner/${course._id}/chapters`)}
              className="cursor-pointer p-4 border rounded mb-3 hover:bg-gray-100"
            >
              <h3 className="font-semibold">{course.title}</h3>
              {course.description && (
                <p className="text-sm text-gray-600">{course.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
