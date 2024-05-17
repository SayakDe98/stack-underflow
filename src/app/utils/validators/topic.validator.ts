import { z } from "zod";

export const topicValidator = z.object({
  name: z.string({ required_error: "Name is required" }).min(3).max(50),
  description: z
    .string({ required_error: "Description is required" })
    .optional(),
});
