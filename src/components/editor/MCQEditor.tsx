import React from "react";
import { Option } from "@/types";
import { ContentBlockEditor } from "./ContentBlockEditor";
import { FaTrash, FaPlus } from "react-icons/fa";

interface MCQEditorProps {
  options: Option[];
  onChange: (options: Option[]) => void;
  type: "single" | "multiple";
}

export const MCQEditor: React.FC<MCQEditorProps> = ({
  options,
  onChange,
  type,
}) => {
  const handleOptionChange = (index: number, newOption: Option) => {
    const newOptions = [...options];
    newOptions[index] = newOption;
    onChange(newOptions);
  };

  const addOption = () => {
    const newOption: Option = {
      id: `opt-${Date.now()}`,
      content: { text: "" },
      isCorrect: false,
    };
    onChange([...options, newOption]);
  };

  const removeOption = (index: number) => {
    onChange(options.filter((_, i) => i !== index));
  };

  const toggleCorrect = (index: number) => {
    const newOptions = [...options];
    if (type === "single") {
      // Uncheck others
      newOptions.forEach((o, i) => {
        o.isCorrect = i === index;
      });
    } else {
      // Toggle current
      newOptions[index].isCorrect = !newOptions[index].isCorrect;
    }
    onChange(newOptions);
  };

  return (
    <div className="mcq-editor">
      <h6 className="mb-3">Options</h6>
      {options.map((option, index) => (
        <div key={option.id} className="card mb-3 border-start border-4" style={{ borderColor: option.isCorrect ? '#198754' : '#dee2e6' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type={type === "single" ? "radio" : "checkbox"}
                  checked={!!option.isCorrect}
                  onChange={() => toggleCorrect(index)}
                  id={`correct-${option.id}`}
                />
                <label className="form-check-label fw-bold" htmlFor={`correct-${option.id}`}>
                  Correct Answer
                </label>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeOption(index)}
              >
                <FaTrash />
              </button>
            </div>
            
            <ContentBlockEditor
              content={option.content}
              onChange={(content) => handleOptionChange(index, { ...option, content })}
            />
          </div>
        </div>
      ))}

      <button className="btn btn-outline-primary w-100" onClick={addOption}>
        <FaPlus className="me-2" /> Add Option
      </button>
    </div>
  );
};
