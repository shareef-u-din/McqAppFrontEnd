import { config } from "@/config";

describe("Config", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("uses environment variables when available", async () => {
    // Set environment variables before importing the config
    process.env.NEXT_PUBLIC_APP_NAME = "Test App";
    process.env.NEXT_PUBLIC_APP_DESCRIPTION = "Test Description";
    process.env.NEXT_PUBLIC_API_URL = "http://test.api";
    process.env.NEXT_PUBLIC_ENABLE_QUESTIONS_VIEW = "true";

    // Re-import the config to get fresh values
    const { config } = await import("@/config");

    expect(config.app.name).toBe("Test App");
    expect(config.app.description).toBe("Test Description");
    expect(config.api.url).toBe("http://test.api");
    expect(config.features.enableQuestionsView).toBe(true);
  });

  it("uses default values when environment variables are not set", async () => {
    delete process.env.NEXT_PUBLIC_APP_NAME;
    delete process.env.NEXT_PUBLIC_APP_DESCRIPTION;
    delete process.env.NEXT_PUBLIC_API_URL;
    delete process.env.NEXT_PUBLIC_ENABLE_QUESTIONS_VIEW;

    // Re-import the config to get fresh values
    const { config } = await import("@/config");

    expect(config.app.name).toBe("MCQ App");
    expect(config.app.description).toBe("Practice MCQs for competitive exams");
    expect(config.api.url).toBe("http://localhost:3000/api");
    expect(config.features.enableQuestionsView).toBe(false);
  });
});
