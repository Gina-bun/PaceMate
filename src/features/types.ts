export interface Resource {
    type: "video" | "reading";
    title: string;
    url: string;
}

export interface QuizOption {
    id: string;
    text: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: QuizOption[];
    correctOptionId: string;
}

export interface Subtopic {
  id: string;
  title: string;
  completed: boolean;
  learningGoals: string[];
  keyConceptSummary: string;
  resources: Resource[];
  quiz: QuizQuestion[];
}

export interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

export interface SubjectData {
    subject: string;
    grade: number;
    topics: Topic[];
}

export interface FlatSubtopic {
  subjectId: string;
  subject: string;
  topic: Topic;
  subtopic: Subtopic;
}
