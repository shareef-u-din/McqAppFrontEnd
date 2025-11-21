import React from "react";
import { MatchPair } from "@/types";
import { ContentBlockEditor } from "./ContentBlockEditor";
import { FaTrash, FaPlus } from "react-icons/fa";

interface MatchEditorProps {
  pairs: MatchPair[];
  onChange: (pairs: MatchPair[]) => void;
}

export const MatchEditor: React.FC<MatchEditorProps> = ({ pairs, onChange }) => {
  const handlePairChange = (index: number, field: "left" | "right", content: any) => {
    const newPairs = [...pairs];
    if (field === "left") {
        newPairs[index].left = content;
    } else {
        newPairs[index].right = content;
    }
    onChange(newPairs);
  };

  const addPair = () => {
    const newPair: MatchPair = {
      id: `pair-${Date.now()}`,
      left: { text: "" },
      right: { text: "" },
    };
    onChange([...pairs, newPair]);
  };

  const removePair = (index: number) => {
    onChange(pairs.filter((_, i) => i !== index));
  };

  return (
    <div className="match-editor">
      <h6 className="mb-3">Matching Pairs</h6>
      {pairs.map((pair, index) => (
        <div key={pair.id} className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Pair #{index + 1}</span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => removePair(index)}
            >
              <FaTrash />
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <ContentBlockEditor
                  label="Column A (Item)"
                  content={pair.left}
                  onChange={(content) => handlePairChange(index, "left", content)}
                />
              </div>
              <div className="col-md-6">
                <ContentBlockEditor
                  label="Column B (Match)"
                  content={pair.right}
                  onChange={(content) => handlePairChange(index, "right", content)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-outline-primary w-100" onClick={addPair}>
        <FaPlus className="me-2" /> Add Pair
      </button>
    </div>
  );
};
