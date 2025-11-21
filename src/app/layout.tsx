import { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientNavBar from "./components/navbar";
import ClientLayout from "@/components/ClientLayout";
import PageWrapper from "@/components/PageWrapper";
import Breadcrumb from "@/components/Breadcrumb";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

import { config } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.app.name,
  description: config.app.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem("theme");
                  var theme = savedTheme || "dark";
                  document.documentElement.setAttribute("data-bs-theme", theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <ThemeProvider>
          <ClientLayout>
            <PageWrapper>
              <ClientNavBar />
              <div className="container">
                <Breadcrumb />
              </div>
              <main id="main-content" className="container py-4">{children}</main>
            </PageWrapper>
          </ClientLayout>
        </ThemeProvider>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
          async
        />
      </body>
    </html>
  );
}
