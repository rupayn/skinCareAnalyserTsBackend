import type { Context, TypedResponse } from "hono";
import { statusCode200 } from "@/config";

// oxlint-disable-next-line no-magic-numbers
type JsonSuccessStatusCode = 200 | 201 | 202;
/* oxlint-disable id-length */

interface messageDataInterface {
  message: string;
  data: {
    success: boolean;
    message: string;
    status: string;
  };
}
interface SuccessResponse {
  success: true;
  message: string;
  data: {
    success: boolean;
    message: string;
    status: string;
  };
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const successResponse = <S extends JsonSuccessStatusCode>(
  context: Context,
  { message, data }: messageDataInterface,
  status: S = statusCode200 as S
): TypedResponse<SuccessResponse, S, "json"> =>
  context.json(
    {
      success: true as const,
      message,
      data,
    },
    status
  );
