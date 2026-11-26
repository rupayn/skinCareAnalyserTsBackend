import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ApiError, logger, errorResponse, type ErrorStatusCode } from "@/lib";
import { ZodError } from "zod";
import { ErrorCodeEnums } from "../features/zod";
import { statusCode400, statusCode500, statusCode599 } from "@/config";

/* oxlint-disable id-length */

const isErrorStatusCode = (status: number): status is ErrorStatusCode =>
  status >= statusCode400 && status <= statusCode599;
const getRequestContext = (
  c: Context
): {
  method: typeof c.req.method;
  path: typeof c.req.path;
} => ({
  method: c.req.method,
  path: c.req.path,
});
// ────────────────────────────────
// Expected application error
// ────────────────────────────────

const handleApiError = (error: ApiError, c: Context): Response => {
  logger.warn(
    Object.assign(getRequestContext(c), {
      err: error,
      statusCode: error.statusCode,
      code: error.code,
    }),
    error.message
  );

  return errorResponse({
    context: c,
    status: error.statusCode,
    code: error.code,
    message: error.message,
  });
};

// ────────────────────────────────
// Zod validation error
// ────────────────────────────────

const handleZodError = (error: ZodError, c: Context): Response => {
  const issues = error.issues.map((issue) => ({
    path: issue.path,
    message: issue.message,
  }));

  logger.warn(
    Object.assign(getRequestContext(c), {
      err: error,
      code: ErrorCodeEnums.VALIDATION_ERROR,
    }),
    "Request validation failed"
  );

  return errorResponse({
    context: c,
    status: statusCode400,
    code: ErrorCodeEnums.VALIDATION_ERROR,
    message: "Request validation failed",
    issues,
  });
};

// ────────────────────────────────
// Hono HTTP exception
// ────────────────────────────────

const handleHttpException = (error: HTTPException, c: Context): Response => {
  logger.warn(
    Object.assign(getRequestContext(c), {
      err: error,
      statusCode: error.status,
    }),
    error.message
  );

  if (isErrorStatusCode(error.status)) {
    return errorResponse({
      context: c,
      status: error.status,
      code: ErrorCodeEnums.HTTP_ERROR,
      message: error.message,
    });
  }

  logger.error(
    Object.assign(getRequestContext(c), {
      err: error,
      statusCode: error.status,
    }),
    "HTTPException contains an invalid error status"
  );

  return errorResponse({
    context: c,
    status: statusCode500,
    code: ErrorCodeEnums.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  });
};

// ────────────────────────────────
// Unexpected / infrastructure error
// ────────────────────────────────

const handleUnexpectedError = (error: Error, c: Context): Response => {
  logger.error(
    Object.assign(getRequestContext(c), {
      err: error,
    }),
    "Unhandled application error"
  );

  return errorResponse({
    context: c,
    status: statusCode500,
    code: ErrorCodeEnums.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error",
  });
};

// ────────────────────────────────
// Global error handler
// ────────────────────────────────

export const globalErrorHandler = (error: Error, c: Context): Response => {
  if (error instanceof ApiError) {
    return handleApiError(error, c);
  }

  if (error instanceof ZodError) {
    return handleZodError(error, c);
  }

  if (error instanceof HTTPException) {
    return handleHttpException(error, c);
  }

  return handleUnexpectedError(error, c);
};
