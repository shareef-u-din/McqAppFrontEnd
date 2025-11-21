import { renderHook, act } from "@testing-library/react";
import { useQuestions } from "@/hooks/useQuestions";
import { ExamProvider } from "@/contexts/ExamContext";
import { Question } from "@/types";
import { SWRConfig } from "swr";

// Mock the API
jest.mock("@/services/api", () => ({
  api: {
    getQuestions: jest.fn((page, pageSize) =>
      Promise.resolve(
        Array(pageSize)
          .fill(null)
          .map((_, index) => ({
            id: `${page}-${index}`,
            question: `Question ${page}-${index}`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A",
            examType: "NEET",
            subjectId: "physics",
            topicId: "mechanics",
            chapterId: "newton-laws",
            difficulty: "medium",
            type: "single",
          }))
      )
    ),
  },
}));

describe("useQuestions Hook", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
      <ExamProvider>{children}</ExamProvider>
    </SWRConfig>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with empty questions array", () => {
    const { result } = renderHook(() => useQuestions(), { wrapper });

    expect(result.current.questions).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();
  });

  it("loads initial page of questions", async () => {
    const { result } = renderHook(() => useQuestions(0, 2), { wrapper });

    // Wait for the initial data to load
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current.questions.length).toBe(2);
    expect(result.current.hasMore).toBe(true);
  });

  it("loads more questions when loadMore is called", async () => {
    const { result } = renderHook(() => useQuestions(0, 2), { wrapper });

    // Wait for initial load
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Load more
    act(() => {
      result.current.loadMore();
    });

    // Wait for the next page to load
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current.questions.length).toBe(4);
  });

  it("handles errors gracefully", async () => {
    const error = new Error("API Error");
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error

    const { getQuestions } = require("@/services/api").api;
    getQuestions.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useQuestions(), { wrapper });

    // Wait for the error to be processed
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("maintains question order when loading more pages", async () => {
    const { result } = renderHook(() => useQuestions(0, 2), { wrapper });

    // Wait for initial load
    await new Promise((resolve) => setTimeout(resolve, 0));

    const firstPageQuestions = [...result.current.questions];

    // Load more
    act(() => {
      result.current.loadMore();
    });

    // Wait for the next page to load
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current.questions.slice(0, 2)).toEqual(firstPageQuestions);
  });
});
