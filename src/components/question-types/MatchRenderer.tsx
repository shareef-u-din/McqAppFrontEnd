import React from "react";
import { MatchQuestion } from "@/types";
import { ContentBlockRenderer } from "../ContentBlockRenderer";

interface MatchRendererProps {
  question: MatchQuestion;
  selectedAnswer: Record<string, string>; // Map left ID to right ID
  onAnswerChange: (answer: Record<string, string>) => void;
  isSubmitted: boolean;
}

export const MatchRenderer: React.FC<MatchRendererProps> = ({
  question,
  selectedAnswer = {},
  onAnswerChange,
  isSubmitted,
}) => {
  // We need to render two columns.
  // The left column is fixed.
  // The right column items can be selected to match with the active left item.
  // OR, simpler UI: Dropdowns for each left item.

  const handleMatchChange = (leftId: string, rightId: string) => {
    if (isSubmitted) return;
    onAnswerChange({
      ...selectedAnswer,
      [leftId]: rightId,
    });
  };

  return (
    <div className="match-question">
      <div className="row">
        <div className="col-md-6">
          <h6 className="text-muted mb-3">Column A</h6>
          {question.pairs.map((pair) => (
            <div key={pair.left.text || pair.id} className="card mb-3 h-100">
              <div className="card-body">
                <ContentBlockRenderer content={pair.left} />
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <h6 className="text-muted mb-3">Column B (Select Match)</h6>
          {question.pairs.map((pair) => (
            <div key={pair.id} className="card mb-3 d-flex align-items-center p-2" style={{ minHeight: '100px' }}>
               <div className="w-100">
                 <select 
                    className="form-select mb-2"
                    value={selectedAnswer[pair.id] || ""}
                    onChange={(e) => handleMatchChange(pair.id, e.target.value)}
                    disabled={isSubmitted}
                 >
                    <option value="">Select match...</option>
                    {question.pairs.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.right.text ? (p.right.text.substring(0, 30) + (p.right.text.length > 30 ? '...' : '')) : `Option ${p.id}`}
                        </option>
                    ))}
                 </select>
                 
                 {/* Preview of the selected right side content if needed, or just render the right side list below for reference */}
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reference List for Column B to see full content */}
      <div className="mt-4">
        <h6 className="text-muted">Column B Reference:</h6>
        <div className="row">
            {question.pairs.map((pair) => (
                <div key={pair.id} className="col-md-6 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <small className="text-muted mb-1 d-block">Option ID: {pair.id}</small>
                            <ContentBlockRenderer content={pair.right} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
