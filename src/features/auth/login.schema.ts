import { z } from "zod";
import { emailSchema, loginPasswordSchema } from "@/lib/validation";

export const loginFormSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
  rememberMe: z.boolean(),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;
