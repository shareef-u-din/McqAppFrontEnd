"use client";

import { Question } from "@/types";
import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronDown, FaFilter, FaTimes } from "react-icons/fa";

interface FilterOption {
  id: string;
  name: string;
  count: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  type: "subjects" | "topics" | "chapters" | "difficulties";
}

export interface FilterState {
  subjects: string[];
  topics: string[];
  chapters: string[];
  difficulties: string[];
}

interface FilterPanelProps {
  questions: Question[];
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterPanel({
  questions,
  onFilterChange,
}: FilterPanelProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    subjects: [],
    topics: [],
    chapters: [],
    difficulties: [],
  });

  const [filterSections, setFilterSections] = useState<FilterSection[]>([]);
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const subjects = new Map<string, { id: string; count: number }>();
    const topics = new Map<string, { id: string; count: number }>();
    const chapters = new Map<string, { id: string; count: number }>();
    const difficulties = new Map<string, { id: string; count: number }>();

    questions.forEach((question) => {
      if (question.subjectId) {
        const subject = subjects.get(question.subjectId) || { id: question.subjectId, count: 0 };
        subject.count++;
        subjects.set(question.subjectId, subject);
      }
      if (question.topicId) {
        const topic = topics.get(question.topicId) || { id: question.topicId, count: 0 };
        topic.count++;
        topics.set(question.topicId, topic);
      }
      if (question.chapterId) {
        const chapter = chapters.get(question.chapterId) || { id: question.chapterId, count: 0 };
        chapter.count++;
        chapters.set(question.chapterId, chapter);
      }
      if (question.difficulty) {
        const difficulty = difficulties.get(question.difficulty) || { id: question.difficulty, count: 0 };
        difficulty.count++;
        difficulties.set(question.difficulty, difficulty);
      }
    });

    const formatName = (id: string): string => {
      return id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const sections: FilterSection[] = [
      {
        title: "Subject",
        type: "subjects",
        options: Array.from(subjects.values()).map((s) => ({
          id: s.id,
          name: formatName(s.id),
          count: s.count,
        })),
      },
      {
        title: "Topic",
        type: "topics",
        options: Array.from(topics.values()).map((t) => ({
          id: t.id,
          name: formatName(t.id),
          count: t.count,
        })),
      },
      {
        title: "Chapter",
        type: "chapters",
        options: Array.from(chapters.values()).map((c) => ({
          id: c.id,
          name: formatName(c.id),
          count: c.count,
        })),
      },
      {
        title: "Difficulty",
        type: "difficulties",
        options: Array.from(difficulties.values()).map((d) => ({
          id: d.id,
          name: d.id.charAt(0).toUpperCase() + d.id.slice(1),
          count: d.count,
        })),
      },
    ];

    setFilterSections(sections);
  }, [questions]);

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const toggleSection = (sectionType: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionType]: !prev[sectionType],
    }));
  };

  const handleFilterChange = (
    type: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[type];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      return {
        ...prev,
        [type]: newValues,
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      subjects: [],
      topics: [],
      chapters: [],
      difficulties: [],
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    (arr) => arr.length > 0
  );

  const filterContent = (
    <>
      <div className="filter-header d-flex justify-content-between align-items-center mb-3">
        <h3 className="h6 mb-0 fw-bold d-flex align-items-center gap-2">
          <FaFilter /> Filters
        </h3>
        <div className="d-flex gap-2 align-items-center">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="btn btn-sm btn-outline-primary"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="btn btn-sm btn-outline-secondary d-md-none"
            aria-label="Close filters"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {filterSections.map((section) => (
        <div key={section.type} className="filter-section mb-3">
          <button
            className="filter-section-header w-100 d-flex justify-content-between align-items-center p-2 border-0 bg-transparent"
            onClick={() => toggleSection(section.type)}
          >
            <span className="fw-semibold">{section.title}</span>
            {collapsedSections[section.type] ? (
              <FaChevronRight className="text-muted" />
            ) : (
              <FaChevronDown className="text-muted" />
            )}
          </button>

          {!collapsedSections[section.type] && (
            <div className="filter-options mt-2">
              {section.options.map((option) => (
                <div key={option.id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`filter-${section.type}-${option.id}`}
                    checked={selectedFilters[section.type].includes(option.id)}
                    onChange={(e) =>
                      handleFilterChange(
                        section.type,
                        option.id,
                        e.target.checked
                      )
                    }
                  />
                  <label
                    className="form-check-label d-flex justify-content-between w-100"
                    htmlFor={`filter-${section.type}-${option.id}`}
                  >
                    <span>{option.name}</span>
                    <span className="badge bg-secondary">{option.count}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="btn btn-primary w-100 d-md-none mb-3 d-flex align-items-center justify-content-center gap-2"
      >
        <FaFilter /> Show Filters
        {hasActiveFilters && (
          <span className="badge bg-light text-primary">
            {Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0)}
          </span>
        )}
      </button>

      {/* Desktop Filter Panel */}
      <div className="filter-panel card d-none d-md-block">
        <div className="card-body">
          {filterContent}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="mobile-filter-overlay d-md-none">
          <div className="mobile-filter-panel card">
            <div className="card-body">
              {filterContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
