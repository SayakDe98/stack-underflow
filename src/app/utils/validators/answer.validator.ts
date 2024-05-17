import { z } from "zod";

export const answerValidator = z.object({
  answer: z.string({ required_error: "Answer is required" }),
});
