import React from "react";
import dynamic from "next/dynamic";
import { CaseStudyQuestion } from "@/types";
import { ContentBlockRenderer } from "../ContentBlockRenderer";

// Dynamically import Question to avoid circular dependency
const Question = dynamic(() => import("../Question").then(mod => mod.Question), {
    loading: () => <p>Loading question...</p>
});

interface CaseStudyRendererProps {
  question: CaseStudyQuestion;
}

export const CaseStudyRenderer: React.FC<CaseStudyRendererProps> = ({
  question,
}) => {
  return (
    <div className="case-study-question">
      <div className="card mb-4 border-primary border-2">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Case Study / Comprehension</h5>
        </div>
        <div className="card-body">
          <ContentBlockRenderer content={question.question} />
        </div>
      </div>

      <div className="child-questions ps-3 border-start border-3">
        <h6 className="text-muted mb-3">Answer the following questions based on the above text:</h6>
        {question.childQuestions.map((childQ, index) => (
          <div key={childQ.id} className="mb-4">
            <div className="d-flex align-items-center mb-2">
                <span className="badge bg-secondary me-2">Q{index + 1}</span>
            </div>
            <Question question={childQ} isChild={true} />
          </div>
        ))}
      </div>
    </div>
  );
};
