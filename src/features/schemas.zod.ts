/* oxlint-disable id-length */
import * as z from "zod";

export const ErrorCodeEnums = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  DATABASE_ERROR: "DATABASE_ERROR",
  REDIS_ERROR: "REDIS_ERROR",
  PAYMENT_ERROR: "PAYMENT_ERROR",
  HTTP_ERROR: "HTTP_ERROR",
} as const;

export const errorCodeSchema = z.enum(Object.values(ErrorCodeEnums));
