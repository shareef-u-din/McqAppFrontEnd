import { renderHook, act } from "@testing-library/react";
import { ExamProvider, useExam } from "@/contexts/ExamContext";
import { Subject, Topic, Chapter } from "@/types";

describe("ExamContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ExamProvider>{children}</ExamProvider>
  );

  const mockSubject: Subject = {
    id: "physics-neet",
    name: "Physics",
    examTypes: ["NEET"],
    description: "Physics for NEET",
  };

  const mockTopic: Topic = {
    id: "mechanics",
    name: "Mechanics",
    subjectId: "physics-neet",
    description: "Laws of motion",
  };

  const mockChapter: Chapter = {
    id: "newton-laws",
    name: "Newton's Laws",
    topicId: "mechanics",
    description: "Three laws of motion",
  };

  it("provides initial null values", () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    expect(result.current.selectedSubject).toBeNull();
    expect(result.current.selectedTopic).toBeNull();
    expect(result.current.selectedChapter).toBeNull();
  });

  it("updates subject selection", () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    act(() => {
      result.current.setSelectedSubject(mockSubject);
    });

    expect(result.current.selectedSubject).toEqual(mockSubject);
  });

  it("updates topic selection", () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    act(() => {
      result.current.setSelectedTopic(mockTopic);
    });

    expect(result.current.selectedTopic).toEqual(mockTopic);
  });

  it("updates chapter selection", () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    act(() => {
      result.current.setSelectedChapter(mockChapter);
    });

    expect(result.current.selectedChapter).toEqual(mockChapter);
  });

  it("maintains all selections independently", () => {
    const { result } = renderHook(() => useExam(), { wrapper });

    act(() => {
      result.current.setSelectedSubject(mockSubject);
      result.current.setSelectedTopic(mockTopic);
      result.current.setSelectedChapter(mockChapter);
    });

    expect(result.current.selectedSubject).toEqual(mockSubject);
    expect(result.current.selectedTopic).toEqual(mockTopic);
    expect(result.current.selectedChapter).toEqual(mockChapter);
  });
});
