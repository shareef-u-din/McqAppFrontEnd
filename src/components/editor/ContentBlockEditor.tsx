import React from "react";
import { ContentBlock } from "@/types";
import { ContentBlockRenderer } from "../ContentBlockRenderer";

interface ContentBlockEditorProps {
  content: ContentBlock;
  onChange: (content: ContentBlock) => void;
  label?: string;
}

export const ContentBlockEditor: React.FC<ContentBlockEditorProps> = ({
  content,
  onChange,
  label,
}) => {
  const handleChange = (field: keyof ContentBlock, value: string) => {
    onChange({
      ...content,
      [field]: value,
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {label && <h6 className="card-title text-muted mb-3">{label}</h6>}
        
        <div className="mb-3">
          <label className="form-label">Text Content</label>
          <textarea
            className="form-control"
            rows={3}
            value={content.text || ""}
            onChange={(e) => handleChange("text", e.target.value)}
            placeholder="Enter text..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL (Optional)</label>
          <input
            type="text"
            className="form-control"
            value={content.imageUrl || ""}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            placeholder="https://example.com/image.png"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">LaTeX (Optional)</label>
          <input
            type="text"
            className="form-control font-monospace"
            value={content.latex || ""}
            onChange={(e) => handleChange("latex", e.target.value)}
            placeholder="e.g. E = mc^2"
          />
        </div>

        <div className="mt-3 border-top pt-3">
          <small className="text-muted d-block mb-2">Preview:</small>
          <div className="border rounded p-3 bg-light">
            <ContentBlockRenderer content={content} />
          </div>
        </div>
      </div>
    </div>
  );
};
