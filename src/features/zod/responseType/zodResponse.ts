import type { statusCode200 } from "@/config";
import type { ZodType } from "zod";

export interface SuccessResponse200Type<Template extends ZodType> {
  [statusCode200]: {
    description: string;
    content: {
      "application/json": {
        schema: Template;
      };
    };
  };
}
