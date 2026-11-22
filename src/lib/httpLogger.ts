import type { MiddlewareHandler } from "hono";
import { logger } from "./logger.js";

export const httpLogger: MiddlewareHandler = async (context, next) => {
  const start = performance.now();

  await next();

  const responseTime = Math.round(performance.now() - start);

  logger.info(
    {
      method: context.req.method,
      path: context.req.path,
      status: context.res.status,
      responseTime,
    },
    "HTTP request"
  );
};
