import type { ZodType } from "zod";

interface SuccessResponse<Template> {
  success: true;
  message: string;
  data: Template;
}

export const successResponse = <Template>({
  message,
  data,
}: {
  message: string;
  data: Template;
}): SuccessResponse<Template> => ({
  success: true,
  message,
  data,
});
export const genericErrorResponseStructure = function genericErrorResponseStructure<
  Template extends ZodType,
>(
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
