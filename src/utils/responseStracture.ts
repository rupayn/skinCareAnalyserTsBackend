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
