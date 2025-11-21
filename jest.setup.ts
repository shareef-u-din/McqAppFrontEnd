import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock environment variables
process.env.NEXT_PUBLIC_APP_NAME = "MCQ App Test";
process.env.NEXT_PUBLIC_APP_DESCRIPTION = "Test Description";
process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api";
process.env.NEXT_PUBLIC_ENABLE_QUESTIONS_VIEW = "true";
