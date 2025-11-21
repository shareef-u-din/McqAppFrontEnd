import { renderHook, act } from "@testing-library/react";
import { useQuestions } from "@/hooks/useQuestions";
import { ExamProvider } from "@/contexts/ExamContext";
import { Question } from "@/types";
import { SWRConfig } from "swr";

// Import api for proper module mocking
// Note: api is required via require() in tests to allow jest.mock to work

// Mock the api module before any test setup
jest.mock("@/services/api", () => ({
  api: {
    getQuestions: jest.fn(),
  },
}));

// Mock the questions data
const mockQuestions: Question[] = [
  {
    id: "1",
    question: "Test question 1",
    options: [
      { id: "1a", text: "Option A", isCorrect: true },
      { id: "1b", text: "Option B" },
      { id: "1c", text: "Option C" },
      { id: "1d", text: "Option D" },
    ],
    examType: "NEET",
    subjectId: "physics-neet",
    topicId: "mechanics",
    chapterId: "newton-laws",
    difficulty: "easy",
  },
  {
    id: "2",
    question: "Test question 2",
    options: [
      { id: "2a", text: "Option A", isCorrect: true },
      { id: "2b", text: "Option B" },
      { id: "2c", text: "Option C" },
      { id: "2d", text: "Option D" },
    ],
    examType: "NEET",
    subjectId: "physics-neet",
    topicId: "mechanics",
    chapterId: "newton-laws",
    difficulty: "medium",
  },
];

describe("useQuestions Hook", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
      <ExamProvider>{children}</ExamProvider>
    </SWRConfig>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    const { api } = require("@/services/api");
    api.getQuestions.mockResolvedValue(mockQuestions);
  });

  it("loads first page of questions", async () => {
    const { result } = renderHook(() => useQuestions(), { wrapper });

    // Initially empty
    expect(result.current.questions).toHaveLength(0);
    expect(result.current.isLoading).toBe(true);

    // Wait for data to load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Should have questions after loading
    expect(result.current.questions).toHaveLength(mockQuestions.length);
    expect(result.current.isLoading).toBe(false);
  });

  it("loads more questions on loadMore", async () => {
    const { api } = require("@/services/api");
    const { result } = renderHook(() => useQuestions(), { wrapper });

    // Wait for initial data
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Load more
    await act(async () => {
      result.current.loadMore();
    });

    expect(api.getQuestions).toHaveBeenCalledTimes(2);
    expect(api.getQuestions).toHaveBeenLastCalledWith(1, 5);
  });

  it("handles errors gracefully", async () => {
    const { api } = require("@/services/api");
    const error = new Error("Failed to fetch");
    (api.getQuestions as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useQuestions(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(error);
  });
});
