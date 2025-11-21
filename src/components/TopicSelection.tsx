"use client";

import { useExam } from "@/contexts/ExamContext";
import { Topic } from "@/types";
import Link from "next/link";

import { MOCK_TOPICS } from "@/data/topics";

export default function TopicSelection() {
  const { selectedExam, selectedSubject, setSelectedTopic } = useExam();

  const topics = MOCK_TOPICS.filter(
    (topic) => topic.subjectId === selectedSubject?.id
  );

  if (!selectedSubject) {
    return (
      <div className="text-center">
        <p className="lead">Please select a subject first</p>
        <Link
          href={`/practice/${selectedExam?.toLowerCase()}`}
          className="btn btn-primary"
        >
          Go to Subject Selection
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="h4 mb-4">Select a Topic - {selectedSubject.name}</h2>
      <div className="row g-4">
        {topics.map((topic) => (
          <div key={topic.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">{topic.name}</h3>
                <p className="card-text text-muted small">
                  {topic.description}
                </p>
                <Link
                  href={`/practice/${selectedExam?.toLowerCase()}/${
                    selectedSubject.id
                  }/${topic.id}`}
                  className="btn btn-outline-primary"
                  onClick={() => setSelectedTopic(topic)}
                >
                  View Chapters
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
