import { useState, useCallback } from "react";
import useSWR from "swr";
import { Question } from "../types";
import { api } from "../services/api";

export const useQuestions = (initialPage: number = 0, pageSize: number = 5) => {
  const [page, setPage] = useState(initialPage);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  const { data, error, isLoading } = useSWR(
    [`questions-${page}`, pageSize],
    () => api.getQuestions(page, pageSize),
    {
      onSuccess: (newQuestions) => {
        setAllQuestions((prev) => {
          const combined = [...prev];
          newQuestions.forEach((newQ, index) => {
            const position = page * pageSize + index;
            combined[position] = newQ;
          });
          return combined;
        });
      },
    }
  );

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return {
    questions: allQuestions,
    currentPageQuestions: data,
    isLoading,
    error,
    loadMore,
    hasMore: data?.length === pageSize,
  };
};
