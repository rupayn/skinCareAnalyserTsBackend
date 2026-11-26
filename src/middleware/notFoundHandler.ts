import type { Context } from "hono";
import { ApiError, logger } from "@/lib";
import { envs } from "@/config/envs";
import { ErrorCodeEnums } from "@/features";
import { statusCode404 } from "@/config";
import type { ClientErrorStatusCode } from "hono/utils/http-status";

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
  throw new ApiError({
    statusCode: statusCode404 as ClientErrorStatusCode,
    code: ErrorCodeEnums.NOT_FOUND,
    message: "Route Not found",
  });
};
