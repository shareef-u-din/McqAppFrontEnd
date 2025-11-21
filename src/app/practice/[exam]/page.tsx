import { ExamType } from "@/types";
import QuestionsView from "@/components/QuestionsView";
import SubjectSelection from "@/components/SubjectSelection";
import Link from "next/link";

interface Props {
  params: Promise<{ exam: string }>;
  searchParams: Promise<{ view?: string }>;
}

export default async function PracticePage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const examUpper = resolvedParams.exam.toUpperCase() as ExamType;
  const viewAll = resolvedSearchParams?.view === "all";

  // Validate Exam Type
  if (examUpper !== "NEET" && examUpper !== "JEE") {
    return (
      <div className="text-center py-5">
        <h1 className="h4 mb-3">Invalid Exam Type</h1>
        <p className="lead mb-4">The exam type "{examUpper}" is not valid.</p>
        <Link href="/" className="btn btn-primary">
          Go Back to Home
        </Link>
      </div>
    );
  }

  if (viewAll) {
    return <QuestionsView examType={examUpper} />;
  }

  return <SubjectSelection examType={examUpper} />;
}
