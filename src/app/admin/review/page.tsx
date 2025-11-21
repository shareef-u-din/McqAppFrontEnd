"use client";

import React, { useState, useEffect } from "react";
import { Question } from "@/types";
import { MOCK_QUESTIONS } from "@/data/mockQuestions";
import Link from "next/link";
import { Question as QuestionComponent } from "@/components/Question";

export default function ReviewQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching questions for review (e.g., status = 'review' or 'draft')
    // For now, we'll just show all questions to demonstrate
    const fetchQuestions = async () => {
      // In real app: await api.getQuestions({ status: 'review' });
      await new Promise(resolve => setTimeout(resolve, 500));
      setQuestions(MOCK_QUESTIONS);
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleApprove = (id: string) => {
    console.log("Approved question:", id);
    // Update status to 'published'
    setQuestions(questions.map(q => q.id === id ? { ...q, status: 'published' } : q));
  };

  const handleReject = (id: string) => {
    console.log("Rejected question:", id);
    // Update status to 'rejected'
    setQuestions(questions.map(q => q.id === id ? { ...q, status: 'rejected' } : q));
  };

  if (isLoading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Review Questions</h1>
        <Link href="/admin" className="btn btn-outline-secondary">Back to Dashboard</Link>
      </div>

      {questions.length === 0 ? (
        <div className="alert alert-info">No questions to review.</div>
      ) : (
        <div className="row">
          {questions.map((q) => (
            <div key={q.id} className="col-12 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-info me-2">{q.type}</span>
                    <span className={`badge bg-${q.status === 'published' ? 'success' : q.status === 'rejected' ? 'danger' : 'warning'} me-2`}>
                        {q.status}
                    </span>
                    <small className="text-muted">ID: {q.id}</small>
                  </div>
                  <div>
                    <Link href={`/admin/edit/${q.id}`} className="btn btn-sm btn-outline-primary me-2">
                        Edit
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <QuestionComponent question={q} />
                </div>
                <div className="card-footer d-flex justify-content-end gap-2">
                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleReject(q.id)}
                    >
                        Reject
                    </button>
                    <button 
                        className="btn btn-success btn-sm"
                        onClick={() => handleApprove(q.id)}
                    >
                        Approve
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
