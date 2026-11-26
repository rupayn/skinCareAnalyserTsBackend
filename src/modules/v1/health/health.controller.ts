import type { RouteHandler } from "@hono/zod-openapi";
import { successResponse } from "@/lib";
import type { Context } from "hono";
import type { healthRoute } from "./health.route";

export const healthController: RouteHandler<typeof healthRoute> = (context: Context) =>
  successResponse(context, {
    message: "Health check",
    data: {
      success: true,
      message: "Server is OK",
      status: "OK",
    },
  });
