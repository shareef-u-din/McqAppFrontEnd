const requiredEnvVars = [
  "NEXT_PUBLIC_APP_NAME",
  "NEXT_PUBLIC_APP_DESCRIPTION",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_ENABLE_QUESTIONS_VIEW",
] as const;

export function validateEnv() {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        "Please check your .env file and make sure all required variables are set."
    );
  }
}
