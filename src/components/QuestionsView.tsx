import { Question as QuestionType } from "@/types";
import { ExamType } from "@/types";
import Link from "next/link";
import QuestionsClient from "@/components/QuestionsClient";
import { QuestionsService } from "@/services/questions";

export default async function QuestionsView({
  examType,
}: {
  examType: ExamType;
}) {
  const questions = await QuestionsService.getQuestionsByExam(examType);

  if (!examType) {
    return (
      <div className="text-center">
        <p className="lead">Please select an exam type first</p>
        <Link href="/" className="btn btn-primary">
          Go to Exam Selection
        </Link>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-5">
        <h2>No Questions Available</h2>
        <p className="text-muted">
          No questions are available for {examType} at the moment.
        </p>
        <Link href="/" className="btn btn-primary">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h2 className="h4 mb-0">All Questions - {examType}</h2>
        <Link
          href={`/practice/${examType.toLowerCase()}`}
          className="btn btn-outline-primary btn-sm btn-md-medium"
        >
          Browse by Subject
        </Link>
      </div>
      <QuestionsClient initialQuestions={questions} />
    </div>
  );
}
