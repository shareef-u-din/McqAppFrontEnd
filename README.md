# MCQ App

A modern, full-featured Next.js application designed for practicing Multiple Choice Questions (MCQs) for competitive exams like NEET and JEE. Built with performance, accessibility, and a premium user experience in mind.

## 🚀 Features

-   **Exam-Centric Practice**: Tailored flows for NEET, JEE, and other competitive exams.
-   **Subject & Topic Organization**: Hierarchical structure (Exam -> Subject -> Topic -> Chapter).
-   **Interactive Question Types**:
    -   Single/Multiple Choice
    -   Match the Following
    -   Fill in the Blanks
    -   Assertion-Reasoning
    -   Numerical Value
    -   Case Studies
-   **Rich Content Support**: LaTeX for math equations and image support for diagrams.
-   **Dark Mode**: Fully supported dark theme with glass-morphism UI.
-   **Responsive Design**: Mobile-first approach ensuring a great experience on all devices.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Bootstrap 5](https://getbootstrap.com/) & Custom CSS (Glass-morphism)
-   **Math Rendering**: [KaTeX](https://katex.org/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-   **State Management**: React Context API

## 🏁 Getting Started

### Prerequisites

-   Node.js 18.17 or later
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd mcq-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Copy the example environment file and update it with your values:
    ```bash
    cp .env.example .env
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Scripts

-   `npm run dev`: Starts the development server with Turbopack.
-   `npm run build`: Builds the application for production.
-   `npm start`: Starts the production server.
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run type-check`: Runs TypeScript compiler to check for type errors.
-   `npm test`: Runs Jest tests.

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
├── components/          # Reusable React components
├── config/              # Application configuration
├── contexts/            # React Context providers (Theme, Exam, etc.)
├── data/                # Static data and constants
├── hooks/               # Custom React hooks
├── services/            # API services
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🐳 Deployment

### Docker

This project includes a multi-stage `Dockerfile` optimized for production.

1.  **Build the image**
    ```bash
    docker build -t mcq-app .
    ```

2.  **Run the container**
    ```bash
    docker run -p 3000:3000 mcq-app
    ```

### Vercel

The easiest way to deploy is via [Vercel](https://vercel.com/):

1.  Push your code to a Git repository (GitHub, GitLab, BitBucket).
2.  Import the project into Vercel.
3.  Vercel will automatically detect Next.js and configure the build settings.
4.  Add your environment variables in the Vercel dashboard.
5.  Deploy!

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
