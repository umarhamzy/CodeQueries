import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must contain at least 5 characters" })
    .max(130),
  description: z.string().min(20, {
    message: "Description must contain at least 20 characters",
  }),
  tags: z
    .array(z.string().min(1).max(15))
    .min(1, { message: "Tags must contain at least 1 tag. Refer example" })
    .max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(50),
});

export const ProfileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  portfolioWebsite: z.string().url().optional(),
  location: z.string().min(2).max(50),
  bio: z.string().min(2).max(200),
});
