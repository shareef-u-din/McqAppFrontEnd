"use client";

import { ExamProvider } from "@/contexts/ExamContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ExamProvider>{children}</ExamProvider>;
}
