import React from "react";
import { NumericalQuestion } from "@/types";

interface NumericalRendererProps {
  question: NumericalQuestion;
  selectedAnswer: string; // Numerical input is handled as string until validation
  onAnswerChange: (answer: string) => void;
  isSubmitted: boolean;
}

export const NumericalRenderer: React.FC<NumericalRendererProps> = ({
  question,
  selectedAnswer = "",
  onAnswerChange,
  isSubmitted,
}) => {
  return (
    <div className="numerical-question">
      <div className="mb-3">
        <label htmlFor={`num-input-${question.id}`} className="form-label">
          Enter your answer:
        </label>
        <input
          type="number"
          className="form-control form-control-lg"
          id={`num-input-${question.id}`}
          value={selectedAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={isSubmitted}
          placeholder="Type a number..."
          step="any"
        />
        <div className="form-text">
          {question.correctRange 
            ? "Enter a value within the expected range." 
            : "Enter the exact numerical value."}
        </div>
      </div>
    </div>
  );
};
