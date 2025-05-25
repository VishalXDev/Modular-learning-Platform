import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { Question } from "@/types"; // <-- named import

const ChapterQuestionsPage = () => {
  const router = useRouter();
  const { courseId, chapterId } = router.query;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId && chapterId) {
      async function fetchQuestions() {
        try {
          const res = await api.get<{ questions: Question[] }>(
            `/learner/courses/${courseId}/chapters/${chapterId}`
          );
          setQuestions(res.data.questions || []);
        } catch (error) {
          console.error("Failed to fetch questions", error);
        } finally {
          setLoading(false);
        }
      }
      fetchQuestions();
    }
  }, [courseId, chapterId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post<{ results: { [key: string]: boolean } }>(
        `/learner/courses/${courseId}/chapters/${chapterId}/submit`,
        { answers }
      );
      setResults(res.data.results); // { questionId: true/false }
      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit answers. Please try again.");
    }
  }

  if (loading) return <p className="p-4">Loading questions...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chapter Questions</h1>

      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q._id} className="mb-6 p-4 border rounded bg-white">
            <p className="font-medium mb-2">{q.text}</p>
            {q.options.map((opt: string, index: number) => (
              <label key={index} className="block">
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  disabled={submitted}
                  checked={answers[q._id] === opt}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [q._id]: opt }))
                  }
                />
                <span className="ml-2">{opt}</span>
              </label>
            ))}

            {submitted && results[q._id] !== undefined && (
              <p
                className={`mt-2 font-semibold ${
                  results[q._id] ? "text-green-600" : "text-red-600"
                }`}
              >
                {results[q._id] ? "✅ Correct" : "❌ Incorrect"}
              </p>
            )}
          </div>
        ))}

        {!submitted && (
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Submit Answers
          </button>
        )}
      </form>

      {submitted && (
        <div className="mt-6 p-4 bg-green-100 rounded text-green-800">
          <p>
            You answered {Object.keys(answers).length} out of {questions.length} questions.
          </p>
          <p>Progress saved successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ChapterQuestionsPage;
