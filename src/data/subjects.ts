import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "physics-neet",
    name: "Physics",
    examTypes: ["NEET", "JEE"],
    description: "Concepts in Physics for medical entrance",
  },
  {
    id: "chemistry-neet",
    name: "Chemistry",
    examTypes: ["NEET", "JEE"],
    description: "Organic, Inorganic, and Physical Chemistry",
  },
  {
    id: "biology-neet",
    name: "Biology",
    examTypes: ["NEET"],
    description: "Botany and Zoology for NEET",
  },
  {
    id: "maths-jee",
    name: "Mathematics",
    examTypes: ["JEE"],
    description: "Advanced Mathematics for JEE",
  },
];
