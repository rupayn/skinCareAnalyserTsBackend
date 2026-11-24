import type { SuccessResponse200Type } from "@/features";
import type { ZodType } from "zod";

export const successResponse200 = <Template extends ZodType>(
  schema: Template,
  description = "Success"
): SuccessResponse200Type<Template> => ({
  200: {
    description,
    content: {
      "application/json": {
        schema,
      },
    },
  },
});
