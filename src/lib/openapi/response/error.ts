import {
  internalServerErrorResponseSchema,
  validationErrorSchema,
  type ErrorCode,
} from "@/features";
import type { Context } from "hono";
import type { ErrorStatusCode } from "@/lib";
import { statusCode400, statusCode500 } from "@/config";

export const errorResponse500 = (): {
  [statusCode500]: {
    description: string;
    content: {
      "application/json": {
        schema: typeof internalServerErrorResponseSchema;
      };
    };
  };
} => ({
  [statusCode500]: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: internalServerErrorResponseSchema,
      },
    },
  },
});

// oxlint-disable-next-line no-magic-numbers
type JsonErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 502 | 503;

interface GenericErrorOptions<Template = unknown> {
  status: JsonErrorStatusCode;
  code: ErrorCode;
  message?: string;
  issues?: Template;
}

export const genericErrorResponse = <Template = unknown>(
  context: Context,
  { status, code, message = "Failed", issues }: GenericErrorOptions<Template>
): Response =>
  context.json(
    {
      success: false as const,
      message,
      error: Object.assign(issues !== undefined && { issues }, {
        code,
        message,
      }),
    },
    status
  );

export const validationErrorResponse = function validationErrorResponse(): {
  [statusCode400]: {
    description: string;
    content: {
      "application/json": {
        schema: typeof validationErrorSchema;
      };
    };
  };
} {
  return {
    [statusCode400]: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: validationErrorSchema,
        },
      },
    },
  };
};

interface ErrorResponseOptions<Template> {
  context: Context;
  status: ErrorStatusCode;
  code: ErrorCode;
  message?: string;
  issues?: Template;
}

export const errorResponse = <Template>({
  context,
  status,
  code,
  message = "Failed",
  issues,
}: ErrorResponseOptions<Template>): Response => {
  const error = Object.assign(issues !== undefined && { issues }, {
    code,
    message,
  });

  return context.json(
    {
      success: false,
      message,
      error,
    },
    status
  );
};
