import { Question, AuthResponse } from "../types";
import { MOCK_QUESTIONS as DATA_MOCK_QUESTIONS } from "../data/mockQuestions";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
// Mock data
const localMockQuestions: Question[] = [
  {
    id: "1",
    type: "single",
    question: { text: "What is the SI unit of force?" },
    options: [
        { id: "1-opt-0", content: { text: "Newton" }, isCorrect: true },
        { id: "1-opt-1", content: { text: "Joule" }, isCorrect: false },
        { id: "1-opt-2", content: { text: "Watt" }, isCorrect: false },
        { id: "1-opt-3", content: { text: "Pascal" }, isCorrect: false },
    ],
    examType: "NEET",
    subjectId: "PHY101",
    topicId: "MECH101",
    chapterId: "FORCE101",
    difficulty: "easy",
    explanation: {
      text: "Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kilogram of mass at 1 meter per second squared.",
    },
    status: "published",
    version: 1,
    tags: ["physics", "units"],
  },
  {
    id: "2",
    type: "multiple",
    question: { text: "Which of the following are noble gases?" },
    options: [
        { id: "2-opt-0", content: { text: "Helium" }, isCorrect: true },
        { id: "2-opt-1", content: { text: "Nitrogen" }, isCorrect: false },
        { id: "2-opt-2", content: { text: "Neon" }, isCorrect: true },
        { id: "2-opt-3", content: { text: "Argon" }, isCorrect: true },
    ],
    examType: "NEET",
    subjectId: "CHEM101",
    topicId: "PERIODIC101",
    chapterId: "NOBLEGAS101",
    difficulty: "medium",
    explanation: {
      text: "Noble gases are chemical elements with complete outer electron shells, making them highly unreactive.",
    },
    status: "published",
    version: 1,
    tags: ["chemistry", "noble gases"],
  },
  {
    id: "3",
    type: "single", // Changed to single as the options suggest single correct answer
    question: { text: "Solve the quadratic equation: x^2 + x - 6 = 0" },
    options: [
      { id: "3-opt-0", content: { text: "x = 2 or x = -3" }, isCorrect: true },
      { id: "3-opt-1", content: { text: "x = 1 or x = -4" }, isCorrect: false },
      { id: "3-opt-2", content: { text: "x = 3 or x = -2" }, isCorrect: false },
      { id: "3-opt-3", content: { text: "x = 0 or x = -5" }, isCorrect: false },
    ],
    examType: "JEE",
    subjectId: "MATH101",
    topicId: "ALG101",
    chapterId: "QUAD101",
    difficulty: "hard",
    explanation: {
        text: "Using the quadratic formula or factoring: (x + 3)(x - 2) = 0",
        latex: "x^2 + x - 6 = 0 \\implies (x+3)(x-2)=0 \\implies x=-3, 2"
    },
    status: "published",
    version: 1,
    tags: ["math", "quadratic"],
  },
];

export const api = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await delay(500);
    if (email && password) {
      return {
        token: "mock-jwt-token",
        user: {
          id: "1",
          email,
          username: email.split("@")[0],
        },
      };
    }
    throw new Error("Invalid credentials");
  },

  register: async (
    email: string,
    password: string,
    username: string
  ): Promise<AuthResponse> => {
    await delay(500);
    if (email && password && username) {
      return {
        token: "mock-jwt-token",
        user: {
          id: "1",
          email,
          username,
        },
      };
    }
    throw new Error("Invalid registration data");
  },

  getQuestions: async (
    page: number = 0,
    limit: number = 5
  ): Promise<Question[]> => {
    await delay(500);
    const start = page * limit;
    const end = start + limit;
    const questions = localMockQuestions.slice(start, end);

    // Generate additional mock questions if needed
    while (questions.length < limit) {
      const qId = `generated-${start + questions.length}`;
      questions.push({
        id: qId,
        type: "single",
        question: { text: `Sample question ${start + questions.length}?` },
        options: [
            { id: `${qId}-opt-0`, content: { text: "Option A" }, isCorrect: true },
            { id: `${qId}-opt-1`, content: { text: "Option B" }, isCorrect: false },
            { id: `${qId}-opt-2`, content: { text: "Option C" }, isCorrect: false },
            { id: `${qId}-opt-3`, content: { text: "Option D" }, isCorrect: false },
        ],
        examType: "NEET",
        subjectId: "PHY101",
        topicId: "MECH101",
        chapterId: "FORCE101",
        difficulty: "easy",
        status: "published",
        version: 1,
        tags: ["generated"],
      });
    }

    return questions;
  },

  checkAnswer: async (
    questionId: string,
    answer: any
  ): Promise<boolean> => {
    await delay(500);
    let question = localMockQuestions.find((q) => q.id === questionId);
    if (!question) {
        question = DATA_MOCK_QUESTIONS.find((q) => q.id === questionId);
    }
    
    if (!question) return false;

    switch (question.type) {
        case "single":
            if (typeof answer === "string") {
                const opt = question.options.find(o => o.id === answer);
                return !!opt?.isCorrect;
            }
            return false;
        case "multiple":
            if (Array.isArray(answer)) {
                const correctIds = question.options.filter(o => o.isCorrect).map(o => o.id);
                return answer.length === correctIds.length && answer.every((id: string) => correctIds.includes(id));
            }
            return false;
        case "match":
            // Mock validation for match: check if answer object matches correctMatches
            // Since we don't have correctMatches in the mock data yet, we'll assume true for now if it's not empty
            // In a real app, we would compare answer (Record<string, string>) with question.correctMatches
            return true; 
        case "numerical":
             if (question.correctValue !== undefined) {
                 return Math.abs(parseFloat(answer) - question.correctValue) < (question.tolerance || 0.0001);
             } else if (question.correctRange) {
                 const val = parseFloat(answer);
                 return val >= question.correctRange.min && val <= question.correctRange.max;
             }
             return false;
        case "assertion-reason":
            return answer === question.correctOption;
        case "fill-blanks":
            // Mock validation: check if answer array matches correctAnswers
            if (Array.isArray(answer) && question.correctAnswers) {
                return answer.length === question.correctAnswers.length && 
                       answer.every((a: string, i: number) => a.toLowerCase().trim() === question.correctAnswers[i].toLowerCase().trim());
            }
            return false;
        case "case-study":
            // Case study itself doesn't have an answer, its children do. 
            // This endpoint might not be called for the parent case study, but for children.
            return true;
        default:
            return false;
    }
  },
};
