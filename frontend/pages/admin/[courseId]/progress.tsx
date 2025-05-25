import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/services/api";

interface Chapter {
  _id: string;
  title: string;
}

interface CourseWithChapters {
  chapters: Chapter[];
}

interface LearnerProgress {
  learner: {
    _id: string;
    name: string;
  };
  progress: { [chapterId: string]: boolean };
}

const CourseProgressPage = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [learners, setLearners] = useState<LearnerProgress[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const fetchData = async () => {
      try {
        const chaptersRes = await api.get<CourseWithChapters>(`/admin/courses/${courseId}`);
        setChapters(chaptersRes.data.chapters);

        const learnersRes = await api.get<LearnerProgress[]>(`/admin/courses/${courseId}/progress`);
        setLearners(learnersRes.data);
      } catch (error) {
        console.error("Failed to fetch course progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading) return <p className="p-4">Loading learner progress...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Learner Progress</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Learner</th>
            {chapters.map((ch) => (
              <th key={ch._id} className="border px-4 py-2">
                {ch.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {learners.map((entry, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-4 py-2">{entry.learner.name}</td>
              {chapters.map((ch) => (
                <td key={ch._id} className="border px-4 py-2">
                  {entry.progress?.[ch._id] ? "✅" : "❌"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseProgressPage;
