import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useProtectRoute from "@/utils/protectRoute";
import api from "@/services/api";

interface Section {
  _id: string;
  title: string;
  description?: string;
}

export default function SectionsPage() {
  useProtectRoute("admin");
  const router = useRouter();
  const { courseId } = router.query;

  const [sections, setSections] = useState<Section[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;
    fetchSections();
  }, [courseId]);

  async function fetchSections() {
    try {
      const res = await api.get<Section[]>(`/courses/${courseId}/sections`);
      setSections(res.data);
    } catch (error) {
      alert("Failed to load sections");
    }
  }

  async function handleAddSection(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    setLoading(true);

    try {
      await api.post(`/courses/${courseId}/sections`, { title, description });
      setTitle("");
      setDescription("");
      fetchSections();
    } catch {
      alert("Failed to add section");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Sections</h1>

      <form onSubmit={handleAddSection} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Section Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Section"}
        </button>
      </form>

      <ul>
        {sections.length === 0 && <p>No sections found yet.</p>}
        {sections.map((section) => (
          <li
            key={section._id}
            className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() =>
              router.push(
                `/admin/${courseId}/sections/${section._id}/units`
              )
            }
          >
            <h3 className="font-semibold">{section.title}</h3>
            {section.description && <p className="text-sm">{section.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
