"use client";

import FilterPanel from "@/components/FilterPanel";
import { Question } from "./Question";
import { Question as QuestionType } from "@/types";
import { useState } from "react";

interface QuestionsClientProps {
  initialQuestions: QuestionType[];
}

export default function QuestionsClient({
  initialQuestions,
}: QuestionsClientProps) {
  const [questions] = useState<QuestionType[]>(initialQuestions);
  const [filteredQuestions, setFilteredQuestions] =
    useState<QuestionType[]>(initialQuestions);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const LOAD_MORE_COUNT = 2;

  const handleFilterChange = (filters: {
    subjects: string[];
    topics: string[];
    chapters: string[];
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

    setFilteredQuestions(filtered);
    setVisibleCount(5); // Reset visible count when filters change
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + LOAD_MORE_COUNT);
  };

  return (
    <div className="row position-relative">
      <div className={`${!isPanelVisible ? "d-none" : "col-md-3"} mb-4`}>
        <FilterPanel
          questions={questions}
          onFilterChange={handleFilterChange}
          onVisibilityChange={setIsPanelVisible}
        />
      </div>
      <div className={`${isPanelVisible ? "col-md-9" : "col-12"}`}>
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
  );
}
