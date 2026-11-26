import { healthResponseSchema } from "@/features/zod/schema/health/health.response.zodSchema";
import { createRoute } from "@hono/zod-openapi";

export const healthRoute = createRoute({
  method: "get",
  path: "/health",
  responses: {
    200: {
      description: "Health check successful",
      content: {
        "application/json": {
          schema: healthResponseSchema,
        },
      },
    },
  },
});
