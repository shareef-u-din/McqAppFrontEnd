export type ExamType = "NEET" | "JEE";

export type Subject = {
  id: string;
  name: string;
  examTypes: ExamType[];
  description?: string;
};

export type Topic = {
  id: string;
  name: string;
  subjectId: string;
  description?: string;
};

export type Chapter = {
  id: string;
  name: string;
  topicId: string;
  description?: string;
};

// Question Types
export type QuestionType =
  | "mcq"
  | "multiple-correct"
  | "matching"
  | "fill-blank"
  | "assertion-reason"
  | "case-study";

// Base Options
export type Option = {
  id: string;
  text: string;
  image?: string;
  isCorrect?: boolean;
};

// Matching Options
export type MatchingOption = {
  id: string;
  leftText: string;
  leftImage?: string;
  rightText: string;
  rightImage?: string;
};

// Assertion Reason Options
export type AssertionReasonOption = {
  assertion: string;
  reason: string;
  correctRelation:
    | "both-true-connected"
    | "both-true-unconnected"
    | "assertion-true"
    | "reason-true"
    | "both-false";
};

// Fill in the Blank Options
export type FillBlankOption = {
  id: string;
  blankIndex: number;
  text: string;
  isCorrect: boolean;
};

// Main Question Type
export type Question = {
  id: string;
  type: QuestionType;
  examType: ExamType;
  subjectId: string;
  topicId: string;
  chapterId: string;
  question: string;
  questionImage?: string;
  mathFormula?: string;
  options:
    | Option[]
    | MatchingOption[]
    | AssertionReasonOption
    | FillBlankOption[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  // For case study questions
  caseStudy?: {
    summary: string;
    relatedQuestions: Omit<Question, "type" | "caseStudy">[];
  };
};

export type ChapterStructure = {
  id: string;
  name: string;
  description?: string;
};

export type TopicStructure = {
  id: string;
  name: string;
  chapters: ChapterStructure[];
};

export type SubjectStructure = {
  id: string;
  name: string;
  examType: ExamType;
  description?: string;
  topics: TopicStructure[];
};

export type User = {
  id: string;
  email: string;
  username: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type ApiError = {
  message: string;
  status: number;
};
