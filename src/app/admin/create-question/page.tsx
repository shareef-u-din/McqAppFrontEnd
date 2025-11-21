"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { QuestionEditor } from "@/components/editor/QuestionEditor";
import { Question } from "@/types";

export default function CreateQuestionPage() {
  const router = useRouter();

  const handleSave = async (question: Question) => {
    // In a real app, save to API
    console.log("Saving question:", question);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Question saved (mock)!");
    router.push("/questions"); // Redirect to questions list
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Create New Question</h1>
      <QuestionEditor onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
