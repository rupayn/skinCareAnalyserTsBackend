import type { ErrorCode } from "@/features";
import type { ClientErrorStatusCode, ServerErrorStatusCode } from "hono/utils/http-status";

export type ErrorStatusCode = ClientErrorStatusCode | ServerErrorStatusCode;

export class ApiError extends Error {
  public readonly statusCode: ErrorStatusCode;
  public readonly code: ErrorCode;
  public constructor({
    statusCode,
    message,
    code,
    options,
  }: {
    statusCode: ErrorStatusCode;
    message: string;
    code: ErrorCode;
    options?: {
      cause?: unknown;
    };
  }) {
    super(message, options && { cause: options.cause });

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}
