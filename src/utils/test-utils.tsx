import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ExamProvider } from "@/contexts/ExamContext";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ExamProvider>{children}</ExamProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { customRender as render };
