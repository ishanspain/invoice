import z from "zod";

process.loadEnvFile(".env");

const envSchema = z.object({
  SIGN_SECRET: z.string().min(32),
});

export const envConfigs = envSchema.parse(process.env);
