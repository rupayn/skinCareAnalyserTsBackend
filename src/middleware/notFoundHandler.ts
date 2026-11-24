import type { Context } from "hono";
import { logger } from "@/lib";
import { envs } from "@/config/envs";
import { statusCode404 } from "@/config";

/* oxlint-disable id-length */

interface NotFoundResponse {
  success: false;
  error: {
    code: "NOT_FOUND";
    message: string;
  };
}

export const notFoundHandler = (c: Context): Response => {
  if (envs.NODE_ENV !== "production") {
    logger.warn(
      {
        method: c.req.method,
        path: c.req.path,
      },
      "Route not found"
    );
  }

  return c.json(
    {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
      },
    } satisfies NotFoundResponse,
    statusCode404
  );
};
