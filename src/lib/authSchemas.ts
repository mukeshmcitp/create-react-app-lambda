import { z } from "zod";

const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be under 72 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^A-Za-z0-9]/, "Must contain a special character");

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name is required").max(100),
    email: z.string().trim().toLowerCase().email("Invalid email").max(255),
    mobile: z
      .string()
      .trim()
      .max(20)
      .regex(/^[+\d\s\-()]*$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),
    password: strongPassword,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email").max(255),
  password: z.string().min(1, "Password is required").max(72),
  remember: z.boolean().optional(),
});

export const forgotSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email").max(255),
});

export const resetSchema = z
  .object({
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  mobile: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d\s\-()]*$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
});

export type SignupValues = z.infer<typeof signupSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
