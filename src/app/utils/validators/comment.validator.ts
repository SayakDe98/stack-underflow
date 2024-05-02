import { z } from "zod";

export const commentValidator = z.object({
  message: z.string({ required_error: "Message is required" }),
  upVotes: z.number(),
  downVotes: z.number(),
  replies: z.array(z.string()).optional(),
  attachments: z.any()
});