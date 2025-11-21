import React from "react";
import { AssertionReasonQuestion } from "@/types";
import { ContentBlockRenderer } from "../ContentBlockRenderer";

interface AssertionReasonRendererProps {
  question: AssertionReasonQuestion;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
  isSubmitted: boolean;
}

export const AssertionReasonRenderer: React.FC<AssertionReasonRendererProps> = ({
  question,
  selectedAnswer,
  onAnswerChange,
  isSubmitted,
}) => {
  const options = [
    { id: "A", text: "Both Assertion and Reason are correct and Reason is the correct explanation for Assertion." },
    { id: "B", text: "Both Assertion and Reason are correct but Reason is NOT the correct explanation for Assertion." },
    { id: "C", text: "Assertion is correct but Reason is incorrect." },
    { id: "D", text: "Assertion is incorrect but Reason is correct." },
  ];

  return (
    <div className="assertion-reason-question">
      <div className="mb-4">
        <div className="card mb-3 bg-light">
          <div className="card-body">
            <h6 className="fw-bold text-primary">Assertion (A):</h6>
            <ContentBlockRenderer content={question.assertion} />
          </div>
        </div>
        <div className="card mb-3 bg-light">
          <div className="card-body">
            <h6 className="fw-bold text-primary">Reason (R):</h6>
            <ContentBlockRenderer content={question.reason} />
          </div>
        </div>
      </div>

      <div className="options">
        {options.map((option) => (
          <div
            key={option.id}
            className={`card mb-2 cursor-pointer ${
              selectedAnswer === option.id
                ? "border-primary bg-primary-subtle"
                : "border-light-subtle"
            } ${isSubmitted && question.correctOption === option.id ? "border-success bg-success-subtle" : ""}
              ${isSubmitted && selectedAnswer === option.id && selectedAnswer !== question.correctOption ? "border-danger bg-danger-subtle" : ""}
            `}
            onClick={() => !isSubmitted && onAnswerChange(option.id)}
          >
            <div className="card-body d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={selectedAnswer === option.id}
                  onChange={() => {}}
                  disabled={isSubmitted}
                />
              </div>
              <div>
                <span className="fw-bold me-2">({option.id})</span>
                {option.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
