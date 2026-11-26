import { handle } from "@hono/aws-lambda";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar as scalar } from "@scalar/hono-api-reference";
import { swaggerUI } from "@hono/swagger-ui";
import { envs } from "@/config/envs";
import { ErrorCodeEnums, globalErrorHandler } from "@/features";
import { genericErrorResponse, httpLogger, logger } from "@/lib";
import type { $ZodIssue } from "zod/v4/core";
import routeV1 from "@/modules";
import { notFoundHandler } from "./middleware/notFoundHandler";
import type { Context } from "hono";

const BAD_REQUEST_STATUS = 400;

interface ValidationIssue {
  path: (string | number)[];
  message: string;
}

interface ValidationIssue {
  path: (string | number)[];
  message: string;
}

const groupValidationIssues = (issues: $ZodIssue[]): ValidationIssue[] => {
  const issueMap: Record<string, ValidationIssue> = {};

  for (const issue of issues) {
    const key = issue.path.join(".");
    const existingIssue = issueMap[key];

    if (existingIssue) {
      existingIssue.message += `, ${issue.message}`;
    } else {
      issueMap[key] = {
        path: issue.path.filter(
          (segment): segment is string | number =>
            typeof segment === "string" || typeof segment === "number"
        ),
        message: issue.message,
      };
    }
  }

  return Object.values(issueMap);
};

const app = new OpenAPIHono({
  defaultHook: (result, context): Response | undefined => {
    if (result.success) {
      return;
    }

    if (envs.NODE_ENV !== "production") {
      logger.error(result.error);
    }

    const issues = groupValidationIssues(result.error.issues);

    return genericErrorResponse(context, {
      status: BAD_REQUEST_STATUS,
      code: ErrorCodeEnums.VALIDATION_ERROR,
      message: "Please check your input",
      issues,
    });
  },
}).basePath("/api");

if (envs.NODE_ENV !== "production") {
  app.use(httpLogger);
}

app.route("/", routeV1);

app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Skin care Analyser API",
  },
});

interface swaggerConfigType {
  url: string;
  supportedSubmitMethods?: [];
}

const swaggerConfig: swaggerConfigType = {
  url: "/api/openapi",
};
if (envs.NODE_ENV === "production") {
  swaggerConfig.supportedSubmitMethods = [];
}
app.get("/swagger", swaggerUI(swaggerConfig));
app.get(
  "/docs",
  scalar({
    url: "/api/openapi",
    theme: "bluePlanet",
    layout: "modern",
    defaultHttpClient: { targetKey: "js", clientKey: "axios" },
    hideTestRequestButton: envs.NODE_ENV === "production",
  })
);

app.notFound((context: Context) => notFoundHandler(context));
app.onError((err, context: Context) => globalErrorHandler(err, context));

const handler = handle(app);

export { app, handler };
