import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { ContentBlock } from "@/types";

interface ContentBlockRendererProps {
  content: ContentBlock;
  className?: string;
}

export const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({
  content,
  className = "",
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (content.latex && containerRef.current) {
      const mathElements = containerRef.current.getElementsByClassName("latex-content");
      Array.from(mathElements).forEach((element) => {
        // Only render if not already rendered
        if (!element.hasAttribute("data-katex-rendered")) {
            try {
                katex.render(content.latex!, element as HTMLElement, {
                    throwOnError: false,
                    displayMode: true,
                });
                element.setAttribute("data-katex-rendered", "true");
            } catch (e) {
                console.error("KaTeX rendering error:", e);
            }
        }
      });
    }
  }, [content.latex]);

  return (
    <div className={`content-block ${className}`} ref={containerRef}>
      {content.imageUrl && (
        <div className="mb-3">
          <img
            src={content.imageUrl}
            alt="Question content"
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
      )}
      
      {content.text && (
        <div className="mb-2 text-content">
          {content.text.split('\n').map((line, i) => (
            <p key={i} className="mb-1">{line}</p>
          ))}
        </div>
      )}

      {content.latex && (
        <div className="latex-content mb-3 p-2 latex-container rounded text-center">
            {/* KaTeX will render here */}
            {content.latex}
        </div>
      )}
    </div>
  );
};
