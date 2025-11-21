"use client";

import { useState } from "react";
import { useExam } from "@/contexts/ExamContext";
import { Question as QuestionType } from "@/types";
import { api } from "@/services/api";
import { ContentBlockRenderer } from "./ContentBlockRenderer";
import { MCQRenderer } from "./question-types/MCQRenderer";
import { MatchRenderer } from "./question-types/MatchRenderer";
import { FillBlanksRenderer } from "./question-types/FillBlanksRenderer";
import { NumericalRenderer } from "./question-types/NumericalRenderer";
import { AssertionReasonRenderer } from "./question-types/AssertionReasonRenderer";
import { CaseStudyRenderer } from "./question-types/CaseStudyRenderer";

interface QuestionProps {
  question: QuestionType;
  isChild?: boolean;
}

export const Question: React.FC<QuestionProps> = ({ question, isChild = false }) => {
  // State needs to be flexible to handle different answer types
  // MCQ: string | string[]
  // Match: Record<string, string>
  // FillBlanks: string[]
  // Numerical: string
  // Assertion: string
  const [selectedAnswer, setSelectedAnswer] = useState<any>(
    question.type === "multiple" ? [] : 
    question.type === "match" ? {} :
    question.type === "fill-blanks" ? [] :
    ""
  );
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { selectedSubject, selectedTopic, selectedChapter } = useExam();

  const handleSubmit = async () => {
    const correct = await api.checkAnswer(question.id, selectedAnswer);
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  // Render specific content based on type
  const renderContent = () => {
    switch (question.type) {
      case "single":
      case "multiple":
        return (
          <MCQRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={setSelectedAnswer}
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
          />
        );
      case "match":
        return (
          <MatchRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={setSelectedAnswer}
            isSubmitted={isSubmitted}
          />
        );
      case "fill-blanks":
        return (
          <FillBlanksRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={setSelectedAnswer}
            isSubmitted={isSubmitted}
          />
        );
      case "numerical":
        return (
          <NumericalRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={setSelectedAnswer}
            isSubmitted={isSubmitted}
          />
        );
      case "assertion-reason":
        return (
          <AssertionReasonRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={setSelectedAnswer}
            isSubmitted={isSubmitted}
          />
        );
      case "case-study":
        return <CaseStudyRenderer question={question} />;
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className={`card question-card fade-in ${isChild ? "border-0 shadow-none bg-transparent" : "glass-card"}`}>
      <div className={`card-body ${isChild ? "p-0" : "p-4"}`}>
        {!isChild && selectedSubject && (
          <div className="labels mb-3 d-flex flex-wrap gap-2">
            <span className="badge bg-primary">
              {selectedSubject.name}
            </span>
            {selectedTopic && (
              <span className="badge bg-secondary">
                {selectedTopic.name}
              </span>
            )}
            {selectedChapter && (
              <span className="badge bg-info">{selectedChapter.name}</span>
            )}
            <span className="badge badge-subtle">
                {question.type.toUpperCase().replace("-", " ")}
            </span>
            <span className={`badge ${question.difficulty === 'easy' ? 'bg-success' : question.difficulty === 'medium' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                {question.difficulty}
            </span>
          </div>
        )}

        {/* Question Text - Only for non-case-study types as they handle their own text */}
        {question.type !== "case-study" && question.type !== "fill-blanks" && (
            <div className="mb-3">
                <ContentBlockRenderer content={question.question} className="h5" />
            </div>
        )}

        {renderContent()}

        {question.type !== "case-study" && !isSubmitted && (
          <button
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={
                question.type === "multiple" ? (selectedAnswer as string[]).length === 0 :
                !selectedAnswer
            }
          >
            Submit Answer
          </button>
        )}

        {isSubmitted && (
          <div className="mt-3">
            <div
              className={`alert ${
                isCorrect ? "alert-success" : "alert-danger"
              }`}
            >
              {isCorrect ? "Correct!" : "Incorrect!"}
              {question.explanation && (
                <div className="mt-2">
                  <strong>Explanation:</strong> 
                  <ContentBlockRenderer content={question.explanation} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
