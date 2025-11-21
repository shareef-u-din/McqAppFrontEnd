"use client";

import { Question as QuestionType } from "@/types";
import { Question as QuestionComponent } from "./Question";

interface QuestionServerProps {
  question: QuestionType;
}

export function Question({ question }: QuestionServerProps) {
  return <QuestionComponent question={question} />;
}
