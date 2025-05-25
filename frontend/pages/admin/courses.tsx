// pages/admin/courses.tsx
import { useEffect, useState } from "react";
import useProtectRoute from "@/utils/protectRoute";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/router";

interface Course {
  _id: string;
  title: string;
  description: string;
}

export default function AdminCourses() {
  useProtectRoute("admin");

  const { token } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch courses
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCourses(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  // Handle course creation
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/courses",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses((prev) => [...prev, res.data]);
      setTitle("");
      setDescription("");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error creating course");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

      {/* Course Form */}
      <form onSubmit={handleCreateCourse} className="space-y-4 mb-6 bg-white p-4 rounded shadow">
        <input
          className="w-full p-2 border rounded"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>

      {/* Course List */}
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 bg-gray-100 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p>{course.description}</p>
            </div>
            <button
              onClick={() => router.push(`/admin/${course._id}/sections`)}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Manage Sections
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
