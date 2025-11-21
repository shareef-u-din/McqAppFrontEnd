"use client";

import { Question } from "@/components/Question";
import FilterPanel from "@/components/FilterPanel";
import { useExam } from "@/contexts/ExamContext";
import { MOCK_QUESTIONS } from "@/data/mockQuestions";
import { Question as QuestionType } from "@/types";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AllQuestionsView() {
  const { selectedExam } = useExam();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isPanelVisible, setIsPanelVisible] = useState(true); // Default to true, will be updated in useEffect
  const LOAD_MORE_COUNT = 2;

  useEffect(() => {
    // Check window width after component mounts
    setIsPanelVisible(window.innerWidth >= 768);

    const handleResize = () => {
      setIsPanelVisible(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedExam) {
      // Filter questions for the selected exam
      const examQuestions = MOCK_QUESTIONS.filter(
        (q) => q.examType === selectedExam
      );
      setQuestions(examQuestions);
      setFilteredQuestions(examQuestions);
      setVisibleCount(5); // Reset visible count when exam changes
      setIsLoading(false);
    }
  }, [selectedExam]);

  const handleFilterChange = (filters: {
    subjects: string[];
    topics: string[];
    chapters: string[];
    difficulties: string[];
  }) => {
    let filtered = questions;

    // Apply subject filter
    if (filters.subjects.length > 0) {
      filtered = filtered.filter((q) => filters.subjects.includes(q.subjectId));
    }

    // Apply topic filter
    if (filters.topics.length > 0) {
      filtered = filtered.filter((q) => filters.topics.includes(q.topicId));
    }

    // Apply chapter filter
    if (filters.chapters.length > 0) {
      filtered = filtered.filter((q) => filters.chapters.includes(q.chapterId));
    }

    // Apply difficulty filter
    if (filters.difficulties.length > 0) {
      filtered = filtered.filter((q) => filters.difficulties.includes(q.difficulty));
    }

    setFilteredQuestions(filtered);
    setVisibleCount(5); // Reset visible count when filters change
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + LOAD_MORE_COUNT);
  };

  if (!selectedExam) {
    return (
      <div className="text-center">
        <p className="lead">Please select an exam type first</p>
        <Link href="/" className="btn btn-primary">
          Go to Exam Selection
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-5">
        <h2>No Questions Available</h2>
        <p className="text-muted">
          No questions are available for {selectedExam} at the moment.
        </p>
        <Link href="/" className="btn btn-primary">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">All Questions - {selectedExam}</h2>
        <div className="d-flex gap-2">
          <Link
            href="/admin/create-question"
            className="btn btn-success"
          >
            Create Question
          </Link>
          <Link
            href={`/practice/${selectedExam.toLowerCase()}`}
            className="btn btn-outline-primary"
          >
            Browse by Subject
          </Link>
        </div>
      </div>
      <div className="row position-relative">
        <div className="col-md-3 mb-4">
          <FilterPanel
            questions={questions}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="col-md-9">
          <div className="mb-3">
            <small className="text-muted">
              Showing {filteredQuestions.length} of {questions.length} questions
            </small>
          </div>
          {filteredQuestions.slice(0, visibleCount).map((question) => (
            <Question key={question.id} question={question} />
          ))}
          {visibleCount < filteredQuestions.length && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-primary"
                onClick={handleLoadMore}
              >
                Load More Questions (
                {Math.min(
                  LOAD_MORE_COUNT,
                  filteredQuestions.length - visibleCount
                )}{" "}
                more)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
