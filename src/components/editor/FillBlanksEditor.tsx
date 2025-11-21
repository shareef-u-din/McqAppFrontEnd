import React from "react";
import { FillBlanksQuestion } from "@/types";

interface FillBlanksEditorProps {
  question: FillBlanksQuestion;
  onChange: (updates: Partial<FillBlanksQuestion>) => void;
}

export const FillBlanksEditor: React.FC<FillBlanksEditorProps> = ({
  question,
  onChange,
}) => {
  // Extract placeholders from question text (e.g., {{1}}, {{2}})
  const placeholders = (question.question.text || "").match(/\{\{(\d+)\}\}/g) || [];
  const indices = placeholders
    .map((p) => parseInt(p.replace(/\{\{|\}\}/g, ""), 10))
    .sort((a, b) => a - b);
  
  // Ensure unique indices
  const uniqueIndices = Array.from(new Set(indices));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...(question.correctAnswers || [])];
    // Ensure array is large enough
    while (newAnswers.length < index) {
      newAnswers.push("");
    }
    newAnswers[index - 1] = value;
    onChange({ correctAnswers: newAnswers });
  };

  return (
    <div className="fill-blanks-editor card mb-3">
      <div className="card-body">
        <h6 className="mb-3">Fill in the Blanks Configuration</h6>
        <p className="text-muted small">
          Use <code>{"{{1}}"}</code>, <code>{"{{2}}"}</code>, etc. in the question text to define blanks.
        </p>

        {uniqueIndices.length === 0 ? (
          <div className="alert alert-warning">
            No blanks found in question text. Add <code>{"{{1}}"}</code> to start.
          </div>
        ) : (
          <div className="mb-3">
            {uniqueIndices.map((index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Correct Answer for Blank {index}</label>
                <input
                  type="text"
                  className="form-control"
                  value={question.correctAnswers?.[index - 1] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Answer for {{${index}}}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
