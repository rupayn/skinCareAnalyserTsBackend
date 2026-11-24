import {
  internalServerErrorResponseSchema,
  validationErrorSchema,
  type ErrorCode,
} from "@/features";
import type { ZodType } from "zod";
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

export const genericErrorResponse = function genericErrorResponse<Template extends ZodType>(
  statusCode: number,
  schema: Template,
  description = "Generic error"
): Record<
  number,
  {
    description: string;
    content: {
      "application/json": {
        schema: Template;
      };
    };
  }
> {
  return {
    [statusCode]: {
      description,
      content: {
        "application/json": {
          schema,
        },
      },
    },
  };
};

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
