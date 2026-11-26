import { statusCode500 } from "@/config";
import { genericErrorResponseSchema } from "@/features";
import { healthResponseSchema } from "@/features/zod/schema/health/health.response.zodSchema";
import { genericErrorResponseStructure } from "@/utils/responseStracture";
import { createRoute } from "@hono/zod-openapi";

export const healthRoute = createRoute({
  method: "get",
  path: "/health",
  responses: Object.assign(
    genericErrorResponseStructure(statusCode500, genericErrorResponseSchema, "Internal Error"),
    {
      200: {
        description: "Health check successful",
        content: {
          "application/json": {
            schema: healthResponseSchema,
          },
        },
      },
    }
  ),
});
