import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useProtectRoute from "@/utils/protectRoute";
import api from "@/services/api";

interface Question {
  _id: string;
  type: "mcq" | "fill-blank" | "text" | "audio";
  questionText: string;
  options?: string[];  // for MCQ
  correctAnswer?: string; // for validation (optional here)
}

export default function ChapterQuestions() {
  useProtectRoute("learner");
  const router = useRouter();
  const { courseId, chapterId } = router.query;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!courseId || !chapterId) return;
    fetchQuestions();
  }, [courseId, chapterId]);

  async function fetchQuestions() {
    try {
      const res = await api.get(`/learner/courses/${courseId}/chapters/${chapterId}/questions`);
      setQuestions(res.data);
    } catch {
      alert("Failed to load questions");
    }
  }

  function handleAnswerChange(qId: string, value: string) {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send answers to backend for scoring & progress save
    setSubmitted(true);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chapter Questions</h1>
      {questions.length === 0 ? (
        <p>No questions found for this chapter.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q._id} className="border p-4 rounded">
              <p className="font-semibold mb-2">
                {idx + 1}. {q.questionText}
              </p>

              {/* MCQ */}
              {q.type === "mcq" && q.options && (
                <div className="space-y-1">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        disabled={submitted}
                        onChange={() => handleAnswerChange(q._id, opt)}
                        checked={answers[q._id] === opt}
                        required
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Fill in the blank */}
              {q.type === "fill-blank" && (
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={answers[q._id] || ""}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  disabled={submitted}
                  required
                />
              )}

              {/* Text-based answer */}
              {q.type === "text" && (
                <textarea
                  className="border p-2 rounded w-full"
                  rows={4}
                  value={answers[q._id] || ""}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  disabled={submitted}
                  required
                />
              )}

              {/* Audio-based answer - placeholder for bonus */}
              {q.type === "audio" && (
                <p className="italic text-gray-500">Audio answer input coming soon...</p>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Answers
            </button>
          ) : (
            <p className="text-green-600 font-semibold">Answers submitted! Progress saved.</p>
          )}
        </form>
      )}
    </div>
  );
}
