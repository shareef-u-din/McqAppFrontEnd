import { api } from "@/services/api";
import { config } from "@/config";

// Mock fetch
global.fetch = jest.fn();

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("checks single correct answer", async () => {
    const result = await api.checkAnswer("1", "1-opt-0");
    expect(result).toBe(true);
  });

  it("checks single wrong answer", async () => {
    const result = await api.checkAnswer("1", "1-opt-1");
    expect(result).toBe(false);
  });

  it("checks multiple choice correct answers", async () => {
    const result = await api.checkAnswer("2", ["2-opt-0", "2-opt-2", "2-opt-3"]);
    expect(result).toBe(true);
  });

  it("checks multiple choice wrong answers", async () => {
    const result = await api.checkAnswer("2", ["2-opt-0", "2-opt-1"]);
    expect(result).toBe(false);
  });

  it("handles non-existent question ID", async () => {
    const result = await api.checkAnswer("999", "test");
    expect(result).toBe(false);
  });
});
