// pages/admin/[courseId]/sections/[sectionId]/units.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useProtectRoute from "@/utils/protectRoute";
import api from "@/services/api";

interface Unit {
  _id: string;
  title: string;
  description?: string;
}

export default function UnitsPage() {
  useProtectRoute("admin");
  const router = useRouter();
  const { courseId, sectionId } = router.query;

  const [units, setUnits] = useState<Unit[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseId || !sectionId) return;
    fetchUnits();
  }, [courseId, sectionId]);

  async function fetchUnits() {
    try {
      const res = await api.get(`/courses/${courseId}/sections/${sectionId}/units`);
      setUnits(res.data);
    } catch (error) {
      alert("Failed to load units");
    }
  }

  async function handleAddUnit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    setLoading(true);

    try {
      await api.post(`/courses/${courseId}/sections/${sectionId}/units`, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      fetchUnits();
    } catch {
      alert("Failed to add unit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Units</h1>

      <form onSubmit={handleAddUnit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Unit Title"
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Unit"}
        </button>
      </form>

      <ul>
        {units.length === 0 && <p>No units found yet.</p>}
        {units.map((unit) => (
          <li
            key={unit._id}
            className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() =>
              router.push(
                `/admin/${courseId}/sections/${sectionId}/units/${unit._id}/chapters`
              )
            }
          >
            <h3 className="font-semibold">{unit.title}</h3>
            {unit.description && <p className="text-sm">{unit.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
