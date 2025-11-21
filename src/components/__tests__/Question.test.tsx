import { render, screen, fireEvent, act } from "@/utils/test-utils";
import { Question } from "@/components/Question";
import type { Question as QuestionType } from "@/types";

// Mock the API
jest.mock("@/services/api", () => ({
  api: {
    checkAnswer: jest.fn(() => Promise.resolve(true)),
  },
}));

// Mock katex
jest.mock("katex", () => ({
  render: jest.fn(),
  __esModule: true,
  default: {
    render: jest.fn(),
  },
}));

const mockQuestion: QuestionType = {
  id: "1",
  type: "single",
  question: "What is Newton's First Law?",
  options: [
    { id: "A", text: "An object in motion stays in motion", isCorrect: true },
    { id: "B", text: "Force equals mass times acceleration" },
    { id: "C", text: "Every action has an equal and opposite reaction" },
    { id: "D", text: "None of the above" },
  ],
  examType: "NEET",
  subjectId: "physics-neet",
  topicId: "mechanics",
  chapterId: "newton-laws",
  difficulty: "medium",
  explanation: "This is the law of inertia",
};

describe("Question Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders question text", () => {
    render(<Question question={mockQuestion} />);
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<Question question={mockQuestion} />);
    mockQuestion.options.forEach(
      (option: { id: string; text: string; isCorrect?: boolean }) => {
        expect(screen.getByText(option.text)).toBeInTheDocument();
      }
    );
  });

  it("handles option selection and submission", async () => {
    const { api } = require("@/services/api");
    render(<Question question={mockQuestion} />);
    const firstOption = screen.getByText(mockQuestion.options[0].text);

    await act(async () => {
      await fireEvent.click(firstOption);
    });

    const submitButton = screen.getByText(/submit/i);
    await act(async () => {
      await fireEvent.click(submitButton);
    });

    expect(api.checkAnswer).toHaveBeenCalledWith(
      mockQuestion.id,
      mockQuestion.options[0].id
    );
  });

  it("shows explanation after submission", async () => {
    const { api } = require("@/services/api");
    api.checkAnswer.mockResolvedValueOnce(true);

    render(<Question question={mockQuestion} />);
    const firstOption = screen.getByText(mockQuestion.options[0].text);

    await act(async () => {
      await fireEvent.click(firstOption);
    });

    const submitButton = screen.getByText(/submit/i);
    await act(async () => {
      await fireEvent.click(submitButton);
    });

    expect(
      await screen.findByText(mockQuestion.explanation!)
    ).toBeInTheDocument();
  });

  it("renders math formula when present", () => {
    const questionWithMath: QuestionType = {
      id: "1",
      type: "math",
      question: "What is Newton's First Law?",
      options: [
        {
          id: "A",
          text: "An object in motion stays in motion",
          isCorrect: true,
        },
        { id: "B", text: "Force equals mass times acceleration" },
        { id: "C", text: "Every action has an equal and opposite reaction" },
        { id: "D", text: "None of the above" },
      ],
      examType: "NEET",
      subjectId: "physics-neet",
      topicId: "mechanics",
      chapterId: "newton-laws",
      difficulty: "medium",
      explanation: "This is the law of inertia",
      mathFormula: "F = ma",
    };
    const { container } = render(<Question question={questionWithMath} />);
    expect(container.querySelector(".math-formula")).toBeInTheDocument();
  });
});
