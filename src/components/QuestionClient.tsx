"use client";

import { useState, useEffect } from "react";
import { Question as QuestionType } from "@/types";
import { api } from "@/services/api";
import katex from "katex";
import "katex/dist/katex.min.css";

interface QuestionClientProps {
  question: QuestionType;
}

export function QuestionClient({ question }: QuestionClientProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
    question.type === "multiple" ? [] : ""
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (question.mathFormula) {
      const mathElements = document.getElementsByClassName("math-formula");
      Array.from(mathElements).forEach((element) => {
        katex.render(question.mathFormula!, element as HTMLElement, {
          throwOnError: false,
          displayMode: true,
        });
      });
    }
  }, [question.mathFormula]);

  const handleAnswerChange = (option: string) => {
    if (question.type === "multiple") {
      setSelectedAnswer((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        if (prevArray.includes(option)) {
          return prevArray.filter((a) => a !== option);
        }
        return [...prevArray, option];
      });
    } else {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = async () => {
    const result = await api.checkAnswer(question.id, selectedAnswer);
    setIsCorrect(result);
    setIsSubmitted(true);
  };

  const getOptionClassName = (option: string) => {
    if (!isSubmitted) return "form-check";

    const baseClass = "form-check p-2 rounded";
    const isSelected = Array.isArray(selectedAnswer)
      ? selectedAnswer.includes(option)
      : selectedAnswer === option;
    const isCorrectAnswer = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(option)
      : question.correctAnswer === option;

    if (isCorrectAnswer) {
      return `${baseClass} bg-success-subtle text-success`;
    }
    if (isSelected && !isCorrectAnswer) {
      return `${baseClass} bg-danger-subtle text-danger`;
    }
    return baseClass;
  };

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <div key={index} className={getOptionClassName(option)}>
          <input
            type={question.type === "multiple" ? "checkbox" : "radio"}
            className="form-check-input me-2"
            name={`question-${question.id}`}
            value={option}
            checked={
              Array.isArray(selectedAnswer)
                ? selectedAnswer.includes(option)
                : selectedAnswer === option
            }
            onChange={() => handleAnswerChange(option)}
            disabled={isSubmitted}
            id={`${question.id}-option-${index}`}
          />
          <label
            className="form-check-label w-100 cursor-pointer"
            htmlFor={`${question.id}-option-${index}`}
          >
            {option}
          </label>
        </div>
      ))}

      {!isSubmitted && (
        <button
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={
            Array.isArray(selectedAnswer)
              ? selectedAnswer.length === 0
              : !selectedAnswer
          }
        >
          Submit Answer
        </button>
      )}

      {isSubmitted && (
        <div className="mt-3">
          <div
            className={`alert ${isCorrect ? "alert-success" : "alert-danger"}`}
          >
            {isCorrect ? "Correct!" : "Incorrect!"}
            {question.explanation && (
              <div className="mt-2">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
