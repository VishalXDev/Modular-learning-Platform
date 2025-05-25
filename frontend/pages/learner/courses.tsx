import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

interface Chapter {
  _id: string;
  title: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  progress?: Record<string, boolean>; // chapterId to completion status
}

const LearnerCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        // Explicitly type the response data as Course[]
        const res = await api.get<Course[]>("/learner/courses");
        setCourses(res.data);
      } catch (error) {
        console.error("Failed to load courses", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (loading) return <p className="p-4">Loading courses...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>

      {courses.map((course) => (
        <div key={course._id} className="mb-6 border rounded p-4 bg-white">
          <h2 className="text-xl font-semibold">{course.title}</h2>
          <p className="text-gray-600 mb-2">{course.description}</p>

          <div className="pl-4">
            {course.chapters.map((ch) => (
              <Link
                key={ch._id}
                href={`/learner/${course._id}/chapters?chapterId=${ch._id}`}
                className="block py-1 text-blue-600 hover:underline"
              >
                {ch.title}
                {course.progress?.[ch._id] && (
                  <span className="ml-2 text-green-600">✓ Completed</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearnerCoursesPage;
