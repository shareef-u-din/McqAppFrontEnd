"use client";

import Link from "next/link";
import { ExamType } from "@/types";

const AVAILABLE_EXAMS: Array<{
  id: ExamType;
  title: string;
  description: string;
}> = [
  {
    id: "NEET",
    title: "NEET",
    description: "National Eligibility cum Entrance Test for Medical Courses",
  },
  {
    id: "JEE",
    title: "JEE",
    description: "Joint Entrance Examination for Engineering Courses",
  },
];

const UPCOMING_EXAMS = [
  {
    title: "GATE (Coming Soon)",
    description: "Graduate Aptitude Test in Engineering",
  },
  {
    title: "Azure Certifications (Coming Soon)",
    description: "Microsoft Azure Certification Preparation",
  },
];

export default function Home() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 mb-4 fw-bold">Welcome to MCQ App</h1>
      <p className="lead mb-5">
        Choose your exam preparation path to start practicing with interactive
        multiple choice questions.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          {/* Available Exams */}
          <div className="card glass-card mb-4 fade-in">
            <div className="card-body p-4">
              <h2 className="h4 mb-4">Available Exam Preparations</h2>
              <div className="row g-4">
                {AVAILABLE_EXAMS.map((exam) => (
                  <div key={exam.id} className="col-md-6">
                    <div className="card h-100">
                      <div className="card-body p-4 d-flex flex-column">
                        <h3 className="h5 mb-3 fw-bold">{exam.title}</h3>
                        <p className="text-muted mb-4 flex-grow-1">
                          {exam.description}
                        </p>
                        <Link
                          href={`/practice/${exam.id.toLowerCase()}`}
                          className="btn btn-primary w-100"
                        >
                          Start Preparation
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="card glass-card fade-in">
            <div className="card-body p-4">
              <h2 className="h4 mb-4">Coming Soon</h2>
              <div className="row g-4">
                {UPCOMING_EXAMS.map((exam) => (
                  <div key={exam.title} className="col-md-6">
                    <div className="card h-100 opacity-75">
                      <div className="card-body p-4 d-flex flex-column">
                        <h3 className="h5 mb-3 fw-bold">{exam.title}</h3>
                        <p className="text-muted mb-4 flex-grow-1">
                          {exam.description}
                        </p>
                        <button className="btn btn-secondary w-100" disabled>
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
