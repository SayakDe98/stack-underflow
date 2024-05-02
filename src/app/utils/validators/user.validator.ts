import { z } from "zod";

export const userValidator = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3, { message: "First Name must be atleast 3 characters" })
    .max(50, { message: "First Name must be at most 50 characters" }),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(2, { message: "Last Name must be atleast 3 characters" })
    .max(50, { message: "Last Name must be at most 50 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be atleast 3 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" })
    .min(5, { message: "Email must be atleast 5 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),
  contactNumber: z
    .string({ required_error: "Contact Number is required" })
    .length(10, { message: "Contact Number must be 10 digits" }),
});

export const loginUserValidator = z.object({
  email: z.string({ required_error: "Email is required"}),
  password: z.string({ required_error: "Password is required"})
});