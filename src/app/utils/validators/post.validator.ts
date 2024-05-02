import { z } from "zod";

export const postValidator = z.object({
  title: z.string({ required_error: "Title is required" }).min(3).max(50),
  message: z
    .string({ required_error: "Message is required" })
    .optional(),
  topics: z.array(z.string()).optional(),
  comments: z.array(z.string()).optional(),
  upVotes: z.number(),
  downVotes: z.number()
  // visits: z.number({ required_error: "Visits is required" }).min(0).optional(),
  // dailyVisits: z
  //   .number({ required_error: "Visits is required" })
  //   .min(0)
  //   .optional(),
  // weeklyVisits: z
  //   .number({ required_error: "Weekly Visits is required" })
  //   .min(0)
  //   .optional(),
  // monthlyVisits: z
  //   .number({ required_error: "Monthly Visits is required" })
  //   .min(0)
  //   .optional(),
});
