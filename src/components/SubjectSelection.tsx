"use client";

import { useEffect } from "react";
import { Subject, ExamType } from "@/types";
import { useExam } from "@/contexts/ExamContext";
import Link from "next/link";

interface SubjectSelectionProps {
  examType: ExamType;
}

import { MOCK_SUBJECTS } from "@/data/subjects";

export default function SubjectSelection({ examType }: SubjectSelectionProps) {
  const { setSelectedExam, setSelectedSubject } = useExam();

  // Set the exam type when component mounts
  useEffect(() => {
    setSelectedExam(examType);
  }, [examType, setSelectedExam]);

  const subjects = MOCK_SUBJECTS.filter((subject) =>
    subject.examTypes.includes(examType)
  );

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  if (!examType) {
    return (
      <div className="text-center">
        <p className="lead">Please select an exam type first</p>
        <Link href="/" className="btn btn-primary">
          Go to Exam Selection
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h2 className="h4 mb-3">Welcome to {examType} Practice</h2>
        <p className="lead mb-4">Choose how you want to practice:</p>
        <div className="d-flex justify-content-center gap-3">
          <Link
            href={`/practice/${examType.toLowerCase()}?view=all`}
            className="btn btn-outline-primary btn-lg"
          >
            View All Questions
          </Link>
          <button
            className="btn btn-primary btn-lg"
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("subjects")?.offsetTop,
                behavior: "smooth",
              })
            }
          >
            Browse by Subject
          </button>
        </div>
      </div>

      <div id="subjects">
        <h3 className="h4 mb-4">Available Subjects</h3>
        <div className="row g-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h5 card-title">{subject.name}</h3>
                  <p className="card-text text-muted small">
                    {subject.description}
                  </p>
                  <Link
                    href={`/practice/${examType.toLowerCase()}/${subject.id}`}
                    className="btn btn-outline-primary"
                    onClick={() => handleSubjectSelect(subject)}
                  >
                    Start Practice
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
