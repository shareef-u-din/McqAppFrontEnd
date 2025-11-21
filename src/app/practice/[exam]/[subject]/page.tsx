"use client";

import { useParams } from "next/navigation";
import TopicSelection from "@/components/TopicSelection";
import { useExam } from "@/contexts/ExamContext";
import { useEffect } from "react";
import { Subject } from "@/types";
import { MOCK_SUBJECTS } from "@/data/subjects";

// Mock function to get subject by ID
const getSubjectById = (id: string): Subject | null => {

  return MOCK_SUBJECTS.find((s) => s.id === id) || null;
};

export default function SubjectPage() {
  const params = useParams();
  const { setSelectedSubject } = useExam();
  const subjectId = params.subject as string;

  useEffect(() => {
    if (subjectId) {
      const subject = getSubjectById(subjectId);
      if (subject) {
        setSelectedSubject(subject);
      }
    }
  }, [subjectId, setSelectedSubject]);

  return <TopicSelection />;
}
