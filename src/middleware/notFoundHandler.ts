import type { Context } from "hono";
import { genericErrorResponse, logger } from "@/lib";
import { envs } from "@/config/envs";
import { ErrorCodeEnums } from "@/features";

/* oxlint-disable id-length */

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

  return genericErrorResponse(c, {
    status: 404,
    code: ErrorCodeEnums.NOT_FOUND,
    message: "Route not found",
  });
};
