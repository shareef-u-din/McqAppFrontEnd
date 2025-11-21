"use client";

import { useExam } from "@/contexts/ExamContext";
import { Chapter } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

import { MOCK_CHAPTERS } from "@/data/chapters";

export default function ChapterSelection() {
  const params = useParams();
  const { selectedTopic, setSelectedChapter } = useExam();
  
  const exam = params.exam as string;
  const subject = params.subject as string;
  const topic = params.topic as string;

  const chapters = MOCK_CHAPTERS.filter(
    (chapter) => chapter.topicId === selectedTopic?.id
  );

  if (!selectedTopic) {
    return (
      <div className="text-center">
        <p className="lead">Please select a topic first</p>
        <Link
          href={`/practice/${exam}/${subject}`}
          className="btn btn-primary"
        >
          Go to Topic Selection
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="h4 mb-4">Select a Chapter - {selectedTopic.name}</h2>
      <div className="row g-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">{chapter.name}</h3>
                <p className="card-text text-muted small">
                  {chapter.description}
                </p>
                <Link
                  href={`/practice/${exam}/${subject}/${topic}/${chapter.id}`}
                  className="btn btn-outline-primary"
                  onClick={() => setSelectedChapter(chapter)}
                >
                  Start Practice
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
