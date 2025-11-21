export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "MCQ App",
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "Practice MCQs for competitive exams",
  },
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  },
  features: {
    enableQuestionsView:
      process.env.NEXT_PUBLIC_ENABLE_QUESTIONS_VIEW === "true",
  },
} as const;

export type Config = typeof config;
