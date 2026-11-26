import type { RouteHandler } from "@hono/zod-openapi";
import { successResponse } from "@/utils/responseStracture";
import type { Context } from "hono";
import type { healthRoute } from "./health.route";
import { statusCode200 } from "@/config";

export const healthController: RouteHandler<typeof healthRoute> = (context: Context) =>
  context.json(
    successResponse({
      message: "Health check",
      data: {
        success: true,
        message: "Server is OK",
        status: "OK",
      },
    }),
    statusCode200
  );
