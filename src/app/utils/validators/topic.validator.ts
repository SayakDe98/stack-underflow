import { z } from "zod";

export const topicValidator = z.object({
  name: z.string({ required_error: "Name is required" }).min(3).max(50),
  description: z
    .string({ required_error: "Description is required" })
    .optional()
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