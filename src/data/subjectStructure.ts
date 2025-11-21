import { SubjectStructure } from "@/types";

export const SUBJECT_STRUCTURE: SubjectStructure[] = [
  {
    id: "physics-neet",
    name: "Physics",
    examType: "NEET",
    description: "Core physics concepts for NEET examination",
    topics: [
      {
        id: "mechanics",
        name: "Mechanics",
        chapters: [
          {
            id: "newton-laws",
            name: "Newton's Laws",
            description: "Fundamental laws of motion and their applications",
          },
        ],
      },
      {
        id: "thermodynamics",
        name: "Thermodynamics",
        chapters: [
          {
            id: "heat-transfer",
            name: "Heat Transfer",
            description: "Principles and mechanisms of heat transfer",
          },
        ],
      },
    ],
  },
];
