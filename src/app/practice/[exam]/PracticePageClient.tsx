"use client";

import { ExamType } from "@/types";
import { useSearchParams } from "next/navigation";
import SubjectSelection from "@/components/SubjectSelection";
import QuestionsView from "@/components/QuestionsView";

export interface PracticePageClientProps {
  exam: string;
  view?: string;
}

export default function PracticePageClient({ exam }: PracticePageClientProps) {
  const searchParams = useSearchParams();
  const examUpper = exam.toUpperCase() as ExamType;

  if (examUpper !== "NEET" && examUpper !== "JEE") {
    return (
      <div className="text-center py-5">
        <h1 className="h4 mb-3">Invalid Exam Type</h1>
        <p className="lead mb-4">The exam type "{examUpper}" is not valid.</p>
        <a href="/" className="btn btn-primary">
          Go Back to Home
        </a>
      </div>
    );
  }

  const viewAll = searchParams?.get("view") === "all";

  if (viewAll) {
    return <QuestionsView examType={examUpper} />;
  }

  return <SubjectSelection examType={examUpper} />;
}
