import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useProtectRoute from "@/utils/protectRoute";
import api from "@/services/api";

interface Chapter {
  _id: string;
  title: string;
  content?: string;
}

export default function ChaptersPage() {
  useProtectRoute("admin");
  const router = useRouter();
  const { courseId, sectionId, unitId } = router.query;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseId || !sectionId || !unitId) return;
    fetchChapters();
  }, [courseId, sectionId, unitId]);

  async function fetchChapters() {
    try {
      const res = await api.get<Chapter[]>(
        `/courses/${courseId}/sections/${sectionId}/units/${unitId}/chapters`
      );
      setChapters(res.data);
    } catch {
      alert("Failed to load chapters");
    }
  }

  async function handleAddChapter(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    setLoading(true);

    try {
      await api.post(
        `/courses/${courseId}/sections/${sectionId}/units/${unitId}/chapters`,
        { title, content }
      );
      setTitle("");
      setContent("");
      fetchChapters();
    } catch {
      alert("Failed to add chapter");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Chapters</h1>

      <form onSubmit={handleAddChapter} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Chapter Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content (optional)"
          className="w-full border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Chapter"}
        </button>
      </form>

      <ul>
        {chapters.length === 0 && <p>No chapters yet.</p>}
        {chapters.map((chapter) => (
          <li key={chapter._id} className="p-3 border rounded mb-2">
            <h3 className="font-semibold">{chapter.title}</h3>
            {chapter.content && <p className="text-sm">{chapter.content}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
