export interface Course {
  _id: string;
  title: string;
  description: string;
}

export interface ChapterQuestion {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface Chapter {
  _id: string;
  title: string;
  questions: ChapterQuestion[];
}

// Use this for learner-facing questions (no correct answer)
export interface Question {
  _id: string;
  text: string;
  options: string[];
}
