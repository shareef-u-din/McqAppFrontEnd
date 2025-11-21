import React from "react";
import dynamic from "next/dynamic";
import { Question, QuestionEditorProps } from "@/types";
import { FaPlus, FaTrash } from "react-icons/fa";

// Dynamically import QuestionEditor to avoid circular dependency
const QuestionEditor = dynamic<QuestionEditorProps>(() => import("@/components/editor/QuestionEditor"), {
  loading: () => <p>Loading editor...</p>
});

interface CaseStudyEditorProps {
  subQuestions: Question[];
  onChange: (questions: Question[]) => void;
}

export const CaseStudyEditor: React.FC<CaseStudyEditorProps> = ({
  subQuestions,
  onChange,
}) => {
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const addSubQuestion = () => {
    const newQuestion: Question = {
      id: `sub-${Date.now()}`,
      type: "single",
      question: { text: "" },
      options: [],
      examType: "Other", // Default, will inherit or be ignored
      subjectId: "",
      topicId: "",
      chapterId: "",
      difficulty: "medium",
      status: "draft",
      version: 1,
      tags: [],
    };
    onChange([...subQuestions, newQuestion]);
  };

  const updateSubQuestion = (index: number, updatedQ: Question) => {
    const newQuestions = [...subQuestions];
    newQuestions[index] = updatedQ;
    onChange(newQuestions);
  };

  const removeSubQuestion = (index: number) => {
    onChange(subQuestions.filter((_, i) => i !== index));
  };

  const handleSaveSubQuestion = (updatedQ: Question) => {
    if (editingIndex !== null) {
      updateSubQuestion(editingIndex, updatedQ);
      setEditingIndex(null);
    }
  };

  if (editingIndex !== null) {
    return (
      <div className="border rounded p-3 bg-light">
        <h6 className="mb-3">Editing Sub-Question #{editingIndex + 1}</h6>
        <QuestionEditor
          initialQuestion={subQuestions[editingIndex]}
          onSave={handleSaveSubQuestion}
          onCancel={() => setEditingIndex(null)}
        />
      </div>
    );
  }

  return (
    <div className="case-study-editor">
      <h6 className="mb-3">Sub-Questions</h6>
      <div className="accordion" id="subQuestionsAccordion">
        {subQuestions.map((q, index) => (
          <div key={q.id} className="accordion-item">
            <h2 className="accordion-header" id={`heading-${q.id}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${q.id}`}
                aria-expanded="false"
                aria-controls={`collapse-${q.id}`}
              >
                Question #{index + 1}: {q.question.text?.substring(0, 30) || "New Question"}...
              </button>
            </h2>
            <div
              id={`collapse-${q.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${q.id}`}
              data-bs-parent="#subQuestionsAccordion"
            >
              <div className="accordion-body">
                <div className="d-flex justify-content-end gap-2 mb-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setEditingIndex(index)}
                  >
                    Edit Question
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeSubQuestion(index)}
                  >
                    <FaTrash className="me-1" /> Remove
                  </button>
                </div>
                <div className="text-muted small">
                    Type: {q.type} | Difficulty: {q.difficulty}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-outline-primary mt-3 w-100" onClick={addSubQuestion}>
        <FaPlus className="me-2" /> Add Sub-Question
      </button>
    </div>
  );
};
