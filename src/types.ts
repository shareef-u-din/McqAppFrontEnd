export type ExamType = "NEET" | "JEE" | "GATE" | "Azure" | "UPSC" | "Other";

export type QuestionType = 
  | "single" 
  | "multiple" 
  | "match" 
  | "fill-blanks" 
  | "assertion-reason" 
  | "numerical" 
  | "case-study";

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionStatus = "draft" | "review" | "published" | "rejected";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface Subject {
  id: string;
  name: string;
  examTypes: ExamType[];
  description: string;
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
  description: string;
}

export interface Chapter {
  id: string;
  name: string;
  topicId: string;
  description: string;
}

export interface SubjectStructure {
  id: string;
  name: string;
  examType: ExamType;
  description: string;
  topics: {
    id: string;
    name: string;
    chapters: {
      id: string;
      name: string;
      description: string;
    }[];
  }[];
}

export interface ContentBlock {
  text?: string;
  imageUrl?: string;
  latex?: string;
}

export interface Option {
  id: string;
  content: ContentBlock;
  isCorrect?: boolean; // For simple MCQs
}

export interface MatchPair {
  id: string;
  left: ContentBlock;
  right: ContentBlock;
}

export interface QuestionBase {
  id: string;
  type: QuestionType;
  examType: ExamType;
  subjectId: string;
  topicId: string;
  chapterId: string;
  difficulty: Difficulty;
  status: QuestionStatus;
  tags: string[];
  version: number;
  
  // Content
  question: ContentBlock;
  explanation?: ContentBlock;
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
  authorId?: string;
}

export interface MCQQuestion extends QuestionBase {
  type: "single" | "multiple";
  options: Option[];
}

export interface MatchQuestion extends QuestionBase {
  type: "match";
  pairs: MatchPair[];
  // The correct answer could be a mapping of left ID to right ID
  correctMatches: Record<string, string>; 
}

export interface FillBlanksQuestion extends QuestionBase {
  type: "fill-blanks";
  // The question text should contain placeholders like {{1}}, {{2}}
  correctAnswers: string[]; // Ordered array of correct answers
}

export interface AssertionReasonQuestion extends QuestionBase {
  type: "assertion-reason";
  assertion: ContentBlock;
  reason: ContentBlock;
  // Standard options: 
  // A: Both true, R is correct explanation
  // B: Both true, R is NOT correct explanation
  // C: A true, R false
  // D: A false, R true
  correctOption: "A" | "B" | "C" | "D"; 
}

export interface NumericalQuestion extends QuestionBase {
  type: "numerical";
  correctRange?: { min: number; max: number }; // For range-based answers
  correctValue?: number; // For exact integer answers
  tolerance?: number;
}

export interface CaseStudyQuestion extends QuestionBase {
  type: "case-study";
  childQuestions: Question[]; // Recursive definition
}

export type Question = 
  | MCQQuestion 
  | MatchQuestion 
  | FillBlanksQuestion 
  | AssertionReasonQuestion 
  | NumericalQuestion 
  | CaseStudyQuestion;

export interface QuestionEditorProps {
  initialQuestion?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}
