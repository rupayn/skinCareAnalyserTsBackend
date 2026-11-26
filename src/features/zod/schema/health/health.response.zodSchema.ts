import { z } from "@/features";

export const healthResponseSchema = z.object({
  success: z.boolean().meta({ examples: [true] }),
  message: z.string().meta({ examples: ["Health check"] }),
  data: z.object({
    success: z.boolean().meta({ examples: [true] }),
    message: z.string().meta({ examples: ["Server is OK"] }),
    status: z.string().meta({ examples: ["OK"] }),
  }),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
