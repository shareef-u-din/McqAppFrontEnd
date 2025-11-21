import React from "react";
import { NumericalQuestion } from "@/types";

interface NumericalEditorProps {
  question: NumericalQuestion;
  onChange: (updates: Partial<NumericalQuestion>) => void;
}

export const NumericalEditor: React.FC<NumericalEditorProps> = ({
  question,
  onChange,
}) => {
  const mode = question.correctRange ? "range" : "exact";

  const handleModeChange = (newMode: "range" | "exact") => {
    if (newMode === "range") {
      onChange({
        correctValue: undefined,
        tolerance: undefined,
        correctRange: { min: 0, max: 0 },
      });
    } else {
      onChange({
        correctRange: undefined,
        correctValue: 0,
        tolerance: 0,
      });
    }
  };

  return (
    <div className="numerical-editor card mb-3">
      <div className="card-body">
        <h6 className="mb-3">Numerical Answer Configuration</h6>
        
        <div className="mb-3">
          <label className="form-label">Validation Mode</label>
          <div className="btn-group w-100" role="group">
            <input
              type="radio"
              className="btn-check"
              name="num-mode"
              id="mode-exact"
              checked={mode === "exact"}
              onChange={() => handleModeChange("exact")}
            />
            <label className="btn btn-outline-primary" htmlFor="mode-exact">
              Exact Value (with Tolerance)
            </label>

            <input
              type="radio"
              className="btn-check"
              name="num-mode"
              id="mode-range"
              checked={mode === "range"}
              onChange={() => handleModeChange("range")}
            />
            <label className="btn btn-outline-primary" htmlFor="mode-range">
              Range (Min - Max)
            </label>
          </div>
        </div>

        {mode === "exact" && (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Correct Value</label>
              <input
                type="number"
                step="any"
                className="form-control"
                value={question.correctValue ?? 0}
                onChange={(e) => onChange({ correctValue: parseFloat(e.target.value) })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Tolerance (+/-)</label>
              <input
                type="number"
                step="any"
                className="form-control"
                value={question.tolerance ?? 0}
                onChange={(e) => onChange({ tolerance: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        )}

        {mode === "range" && (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Minimum Value</label>
              <input
                type="number"
                step="any"
                className="form-control"
                value={question.correctRange?.min ?? 0}
                onChange={(e) =>
                  onChange({
                    correctRange: {
                      min: parseFloat(e.target.value),
                      max: question.correctRange?.max ?? 0,
                    },
                  })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Maximum Value</label>
              <input
                type="number"
                step="any"
                className="form-control"
                value={question.correctRange?.max ?? 0}
                onChange={(e) =>
                  onChange({
                    correctRange: {
                      min: question.correctRange?.min ?? 0,
                      max: parseFloat(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
