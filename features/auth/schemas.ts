import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must contain at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(64, "Password must not exceed 64 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(64, "Password must not exceed 64 characters"),
});

export const userSchema = z.object({
  $id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string(),
  $createdAt: z.string(),
  $updatedAt: z.string(),
});
