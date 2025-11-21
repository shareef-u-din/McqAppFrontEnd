"use client";

import { useEffect } from "react";
import { useQuestions } from "@/hooks/useQuestions";
import { useAuth } from "@/hooks/useAuth";
import { Question } from "@/components/Question";
import { useRouter } from "next/navigation";

export default function QuestionsPage() {
  const { questions, isLoading, error, loadMore, hasMore } = useQuestions();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading questions. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">MCQ Questions</h1>

      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}

      {isLoading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="text-center mt-4 mb-5">
          <button className="btn btn-primary" onClick={loadMore}>
            Load More Questions
          </button>
        </div>
      )}

      {!hasMore && questions.length > 0 && (
        <div className="alert alert-info text-center" role="alert">
          You've reached the end of the questions!
        </div>
      )}
    </div>
  );
}
