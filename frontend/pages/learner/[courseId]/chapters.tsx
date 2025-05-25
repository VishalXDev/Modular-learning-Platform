import { useState } from "react";
import api from "@/services/api"; // your axios/fetch wrapper

interface Question {
  _id: string;
  text: string;
}

interface Props {
  courseId: string;
  chapterId: string;
  questions: Question[];
}

export default function ChapterQuestions({ courseId, chapterId, questions }: Props) {
  // answers state: questionId → answer string
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Update answer for a question
  function handleChange(qId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
  }

  // Submit handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post(`/learner/courses/${courseId}/chapters/${chapterId}/submit`, {
        answers,
      });
      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit answers. Please try again.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Answer Questions</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((q, i) => (
          <div key={q._id}>
            <label className="block font-semibold mb-1">
              {i + 1}. {q.text}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={answers[q._id] || ""}
              onChange={(e) => handleChange(q._id, e.target.value)}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Answers
        </button>
      </form>

      {submitted && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
          <p>
            You answered {Object.keys(answers).length} out of {questions.length} questions.
          </p>
          <p>Progress saved successfully!</p>
        </div>
      )}
    </div>
  );
}
