import React, { useState } from "react";
import { Question, QuestionType, ExamType, Difficulty, QuestionStatus, QuestionEditorProps } from "@/types";
import { ContentBlockEditor } from "./ContentBlockEditor";
import { MCQEditor } from "./MCQEditor";
import { MatchEditor } from "./MatchEditor";
import { NumericalEditor } from "./NumericalEditor";
import { AssertionReasonEditor } from "./AssertionReasonEditor";
import { FillBlanksEditor } from "./FillBlanksEditor";
import { CaseStudyEditor } from "./CaseStudyEditor";

const DEFAULT_QUESTION: Question = {
  id: "",
  type: "single",
  examType: "Other",
  subjectId: "",
  topicId: "",
  chapterId: "",
  difficulty: "medium",
  status: "draft",
  version: 1,
  tags: [],
  question: { text: "" },
  options: [],
};

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  initialQuestion,
  onSave,
  onCancel,
}) => {
  const [question, setQuestion] = useState<Question>(
    initialQuestion ? { ...initialQuestion } : { ...DEFAULT_QUESTION, id: `q-${Date.now()}` }
  );

  const handleTypeChange = (newType: QuestionType) => {
    // Reset type-specific fields when type changes
    const base = {
      ...question,
      type: newType,
    };

    // Initialize specific fields based on type
    switch (newType) {
      case "single":
      case "multiple":
        setQuestion({ ...base, options: [] } as any);
        break;
      case "match":
        setQuestion({ ...base, pairs: [], correctMatches: {} } as any);
        break;
      case "numerical":
        setQuestion({ ...base, correctValue: 0, tolerance: 0 } as any);
        break;
      case "assertion-reason":
        setQuestion({ 
            ...base, 
            assertion: { text: "" }, 
            reason: { text: "" }, 
            correctOption: "A" 
        } as any);
        break;
      case "fill-blanks":
        setQuestion({ ...base, correctAnswers: [] } as any);
        break;
      case "case-study":
        setQuestion({ ...base, childQuestions: [] } as any);
        break;
      default:
        setQuestion(base as any);
    }
  };

  const renderSpecificEditor = () => {
    switch (question.type) {
      case "single":
      case "multiple":
        return (
          <MCQEditor
            options={(question as any).options || []}
            onChange={(options) => setQuestion({ ...question, options } as any)}
            type={question.type}
          />
        );
      case "match":
        return (
          <MatchEditor
            pairs={(question as any).pairs || []}
            onChange={(pairs) => setQuestion({ ...question, pairs } as any)}
          />
        );
      case "numerical":
        return (
          <NumericalEditor
            question={question as any}
            onChange={(updates) => setQuestion({ ...question, ...updates } as any)}
          />
        );
      case "assertion-reason":
        return (
          <AssertionReasonEditor
            question={question as any}
            onChange={(updates) => setQuestion({ ...question, ...updates } as any)}
          />
        );
      case "fill-blanks":
        return (
          <FillBlanksEditor
            question={question as any}
            onChange={(updates) => setQuestion({ ...question, ...updates } as any)}
          />
        );
      case "case-study":
        return (
          <CaseStudyEditor
            subQuestions={(question as any).childQuestions || []}
            onChange={(childQuestions) => setQuestion({ ...question, childQuestions } as any)}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className="question-editor container py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{initialQuestion ? "Edit Question" : "Create New Question"}</h4>
          <div>
            <span className={`badge bg-${question.status === 'published' ? 'success' : 'secondary'} me-2`}>
              {question.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="card-body">
          {/* Metadata Section */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <label className="form-label">Exam Type</label>
              <select
                className="form-select"
                value={question.examType}
                onChange={(e) => setQuestion({ ...question, examType: e.target.value as ExamType })}
              >
                <option value="NEET">NEET</option>
                <option value="JEE">JEE</option>
                <option value="GATE">GATE</option>
                <option value="UPSC">UPSC</option>
                <option value="Azure">Azure</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Question Type</label>
              <select
                className="form-select"
                value={question.type}
                onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
              >
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
                <option value="match">Match the Following</option>
                <option value="numerical">Numerical</option>
                <option value="assertion-reason">Assertion-Reason</option>
                <option value="fill-blanks">Fill in Blanks</option>
                <option value="case-study">Case Study</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                value={question.difficulty}
                onChange={(e) => setQuestion({ ...question, difficulty: e.target.value as Difficulty })}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={question.status}
                onChange={(e) => setQuestion({ ...question, status: e.target.value as QuestionStatus })}
              >
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="published">Published</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="mb-4">
            <ContentBlockEditor
              label="Question Text"
              content={question.question}
              onChange={(content) => setQuestion({ ...question, question: content })}
            />
          </div>

          {/* Specific Editor Section */}
          <div className="mb-4 border-top pt-4">
            {renderSpecificEditor()}
          </div>

          {/* Explanation Section */}
          <div className="mb-4 border-top pt-4">
            <ContentBlockEditor
              label="Explanation"
              content={question.explanation || { text: "" }}
              onChange={(content) => setQuestion({ ...question, explanation: content })}
            />
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-end gap-2 border-top pt-3">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => onSave(question)}>
              Save Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
