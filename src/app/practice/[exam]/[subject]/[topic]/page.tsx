"use client";

import { useParams } from "next/navigation";
import ChapterSelection from "@/components/ChapterSelection";
import { useExam } from "@/contexts/ExamContext";
import { useEffect } from "react";
import { Topic } from "@/types";
import { MOCK_TOPICS } from "@/data/topics";

// Mock function to get topic by ID
const getTopicById = (id: string): Topic | null => {

  return MOCK_TOPICS.find((t) => t.id === id) || null;
};

export default function TopicPage() {
  const params = useParams();
  const { setSelectedTopic } = useExam();
  const topicId = params.topic as string;

  useEffect(() => {
    if (topicId) {
      const topic = getTopicById(topicId);
      if (topic) {
        setSelectedTopic(topic);
      }
    }
  }, [topicId, setSelectedTopic]);

  return <ChapterSelection />;
}
