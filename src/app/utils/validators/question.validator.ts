import { z } from "zod";

export const questionValidator = z.object({
  title: z.string({ required_error: "Title is required" }).min(3).max(50),
  description: z.string({ required_error: "Description is required" }).min(20),
  thingsDoneAndExpectations: z
    .string({ required_error: "Expectation is required" })
    .min(20),
  topics: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
    {
      required_error: "Topics is required",
    }
  ),
  answers: z.array(z.string()).optional(),
  upVotes: z.number().optional(),
  downVotes: z.number().optional(),
});

export const questionModelValidator = z.object({
  title: z.string({ required_error: "Title is required" }).min(3).max(50),
  description: z.string({ required_error: "Description is required" }).min(20),
  thingsDoneAndExpectations: z
    .string({ required_error: "Expectation is required" })
    .min(20),
  topics: z.array(z.string(), {
    required_error: "Topics is required",
  }),
  answers: z.array(z.string()).optional(),
  upVotes: z.number().optional(),
  downVotes: z.number().optional(),
});
