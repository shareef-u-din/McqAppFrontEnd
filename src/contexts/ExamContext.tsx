"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Subject, Topic, Chapter, ExamType } from "@/types";

type ExamContextType = {
  selectedExam: ExamType | null;
  selectedSubject: Subject | null;
  selectedTopic: Topic | null;
  selectedChapter: Chapter | null;
  setSelectedExam: (exam: ExamType | null) => void;
  setSelectedSubject: (subject: Subject | null) => void;
  setSelectedTopic: (topic: Topic | null) => void;
  setSelectedChapter: (chapter: Chapter | null) => void;
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  return (
    <ExamContext.Provider
      value={{
        selectedExam,
        selectedSubject,
        selectedTopic,
        selectedChapter,
        setSelectedExam,
        setSelectedSubject,
        setSelectedTopic,
        setSelectedChapter,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
}
