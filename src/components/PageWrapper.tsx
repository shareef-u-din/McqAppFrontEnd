"use client";

type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return <div className="min-vh-100 d-flex flex-column">{children}</div>;
}
