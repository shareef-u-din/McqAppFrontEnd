"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionEditor } from "@/components/editor/QuestionEditor";
import { Question } from "@/types";
import { QuestionsService } from "@/services/questions";

export default function EditQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      const q = await QuestionsService.getQuestionById(params.id);
      if (q) {
        setQuestion(q);
      } else {
        alert("Question not found");
        router.push("/admin/review");
      }
      setLoading(false);
    };
    fetchQuestion();
  }, [params.id, router]);

  const handleSave = async (updatedQuestion: Question) => {
    console.log("Saving question:", updatedQuestion);
    // In a real app, call API to update
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Question updated (mock)!");
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (!question) return null;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Edit Question</h1>
      <QuestionEditor 
        initialQuestion={question} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    </div>
  );
}
