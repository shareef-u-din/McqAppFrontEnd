import React from "react";
import { MCQQuestion, Option } from "@/types";
import { ContentBlockRenderer } from "../ContentBlockRenderer";

interface MCQRendererProps {
  question: MCQQuestion;
  selectedAnswer: string | string[];
  onAnswerChange: (answer: string | string[]) => void;
  isSubmitted: boolean;
  isCorrect: boolean;
}

export const MCQRenderer: React.FC<MCQRendererProps> = ({
  question,
  selectedAnswer,
  onAnswerChange,
  isSubmitted,
}) => {
  const handleChange = (optionId: string) => {
    if (isSubmitted) return;

    if (question.type === "multiple") {
      const currentSelected = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      if (currentSelected.includes(optionId)) {
        onAnswerChange(currentSelected.filter((id) => id !== optionId));
      } else {
        onAnswerChange([...currentSelected, optionId]);
      }
    } else {
      onAnswerChange(optionId);
    }
  };

  const getOptionClassName = (option: Option) => {
    const baseClass = "option-card";
    const isSelected = Array.isArray(selectedAnswer)
      ? selectedAnswer.includes(option.id)
      : selectedAnswer === option.id;

    if (!isSubmitted) {
      return `${baseClass} ${isSelected ? "selected" : ""}`;
    }

    // Submitted state
    if (option.isCorrect) {
      return `${baseClass} correct`;
    }
    if (isSelected && !option.isCorrect) {
      return `${baseClass} incorrect`;
    }
    
    return `${baseClass} opacity-75`;
  };

  return (
    <div className="mcq-options">
      {question.options.map((option) => (
        <div
          key={option.id}
          className={getOptionClassName(option)}
          onClick={() => handleChange(option.id)}
          style={{ cursor: isSubmitted ? "default" : "pointer" }}
        >
          <div className="card-body d-flex align-items-start">
            <div className="form-check mt-1 me-3">
              <input
                type={question.type === "multiple" ? "checkbox" : "radio"}
                className="form-check-input"
                checked={
                  Array.isArray(selectedAnswer)
                    ? selectedAnswer.includes(option.id)
                    : selectedAnswer === option.id
                }
                onChange={() => {}} // Handled by parent div click
                disabled={isSubmitted}
              />
            </div>
            <div className="flex-grow-1">
              <ContentBlockRenderer content={option.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
