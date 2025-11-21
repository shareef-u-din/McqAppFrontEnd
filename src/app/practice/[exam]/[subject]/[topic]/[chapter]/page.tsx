import { ExamType, Question as QuestionType } from "@/types";
import { Question } from "@/components/Question";
import { MOCK_QUESTIONS } from "@/data/mockQuestions";
import Link from "next/link";

interface Props {
  params: Promise<{
    exam: string;
    subject: string;
    topic: string;
    chapter: string;
  }>;
}

export default async function ChapterQuestionsPage({ params }: Props) {
  const resolvedParams = await params;
  const exam = resolvedParams.exam.toUpperCase() as ExamType;

  if (exam !== "NEET" && exam !== "JEE") {
    return (
      <div className="text-center py-5">
        <h1 className="h4 mb-3">Invalid Exam Type</h1>
        <p className="lead mb-4">The exam type "{exam}" is not valid.</p>
        <Link href="/" className="btn btn-primary">
          Go Back to Home
        </Link>
      </div>
    );
  }

  const examType = exam as ExamType;
  const { subject: subjectId, topic: topicId, chapter: chapterId } = resolvedParams;

  console.log("Filtering questions with:", {
    examType,
    subjectId,
    topicId,
    chapterId,
  });

  const questions = MOCK_QUESTIONS.filter(
    (q) =>
      q.examType === examType &&
      q.subjectId === subjectId &&
      q.topicId === topicId &&
      q.chapterId === chapterId
  );

  if (questions.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h1 className="h4 mb-3">No questions found</h1>
          <p className="lead mb-4">
            No questions are available for this chapter at the moment.
          </p>
          <Link
            href={`/practice/${examType.toLowerCase()}`}
            className="btn btn-primary"
          >
            Go Back to Subject Selection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="h4 mb-4">Practice Questions</h1>
      <div className="d-flex flex-column gap-4">
        {questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
