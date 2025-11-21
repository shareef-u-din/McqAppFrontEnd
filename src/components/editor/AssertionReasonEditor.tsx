import React from "react";
import { AssertionReasonQuestion } from "@/types";

interface AssertionReasonEditorProps {
  question: AssertionReasonQuestion;
  onChange: (updates: Partial<AssertionReasonQuestion>) => void;
}

export const AssertionReasonEditor: React.FC<AssertionReasonEditorProps> = ({
  question,
  onChange,
}) => {
  const options = [
    { id: "both-correct-explanation", text: "Both Assertion and Reason are correct and Reason is the correct explanation for Assertion" },
    { id: "both-correct-no-explanation", text: "Both Assertion and Reason are correct but Reason is NOT the correct explanation for Assertion" },
    { id: "assertion-correct", text: "Assertion is correct but Reason is incorrect" },
    { id: "reason-correct", text: "Assertion is incorrect but Reason is correct" },
  ];

  return (
    <div className="assertion-reason-editor card mb-3">
      <div className="card-body">
        <h6 className="mb-3">Correct Answer Configuration</h6>
        
        <div className="mb-3">
          <label className="form-label">Select Correct Option</label>
          {options.map((option) => (
            <div key={option.id} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="ar-correct-option"
                id={`ar-${option.id}`}
                checked={question.correctOption === option.id}
                onChange={() => onChange({ correctOption: option.id as any })}
              />
              <label className="form-check-label" htmlFor={`ar-${option.id}`}>
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
