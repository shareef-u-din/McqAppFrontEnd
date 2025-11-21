import React from "react";
import { FillBlanksQuestion } from "@/types";
import { ContentBlockRenderer } from "../ContentBlockRenderer";

interface FillBlanksRendererProps {
  question: FillBlanksQuestion;
  selectedAnswer: string[]; // Array of answers corresponding to blanks
  onAnswerChange: (answer: string[]) => void;
  isSubmitted: boolean;
}

export const FillBlanksRenderer: React.FC<FillBlanksRendererProps> = ({
  question,
  selectedAnswer = [],
  onAnswerChange,
  isSubmitted,
}) => {
  // Helper to parse text and inject inputs
  const renderQuestionWithInputs = () => {
    if (!question.question.text) return null;

    const parts = question.question.text.split(/(\{\{\d+\}\})/g);
    let blankIndex = 0;

    return (
      <div className="d-flex flex-wrap align-items-center gap-2 lh-lg">
        {parts.map((part, index) => {
          if (part.match(/\{\{\d+\}\}/)) {
            const currentIndex = blankIndex;
            blankIndex++;
            return (
              <input
                key={index}
                type="text"
                className="form-control d-inline-block w-auto px-2 py-1 mx-1 text-center border-bottom border-0 rounded-0 bg-light"
                style={{ minWidth: "80px", maxWidth: "150px" }}
                value={selectedAnswer[currentIndex] || ""}
                onChange={(e) => {
                  const newAnswers = [...selectedAnswer];
                  newAnswers[currentIndex] = e.target.value;
                  onAnswerChange(newAnswers);
                }}
                disabled={isSubmitted}
                placeholder={`(${currentIndex + 1})`}
              />
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="fill-blanks-question">
      <div className="mb-4">
        {renderQuestionWithInputs()}
      </div>
      
      {/* Render other content like images if present */}
      {(question.question.imageUrl || question.question.latex) && (
          <div className="mt-3">
              <ContentBlockRenderer content={{...question.question, text: undefined}} />
          </div>
      )}
    </div>
  );
};
