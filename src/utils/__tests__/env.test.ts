import { validateEnv } from "@/utils/env";

describe("Environment Validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should not throw error when all required env vars are present", () => {
    process.env.NEXT_PUBLIC_APP_NAME = "Test App";
    process.env.NEXT_PUBLIC_APP_DESCRIPTION = "Test Description";
    process.env.NEXT_PUBLIC_API_URL = "http://test.api";
    process.env.NEXT_PUBLIC_ENABLE_QUESTIONS_VIEW = "true";

    expect(() => validateEnv()).not.toThrow();
  });

  it("should throw error when required env vars are missing", () => {
    delete process.env.NEXT_PUBLIC_APP_NAME;
    delete process.env.NEXT_PUBLIC_APP_DESCRIPTION;
    delete process.env.NEXT_PUBLIC_API_URL;
    delete process.env.NEXT_PUBLIC_ENABLE_QUESTIONS_VIEW;

    expect(() => validateEnv()).toThrow();
  });

  it("should throw error with specific missing env var in message", () => {
    process.env.NEXT_PUBLIC_APP_NAME = "Test App";
    delete process.env.NEXT_PUBLIC_APP_DESCRIPTION;
    process.env.NEXT_PUBLIC_API_URL = "http://test.api";
    process.env.NEXT_PUBLIC_ENABLE_QUESTIONS_VIEW = "true";

    expect(() => validateEnv()).toThrow("NEXT_PUBLIC_APP_DESCRIPTION");
  });
});
