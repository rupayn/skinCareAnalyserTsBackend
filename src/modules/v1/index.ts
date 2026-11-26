import { OpenAPIHono } from "@hono/zod-openapi";
import { healthRoute } from "./health/health.route";
import { healthController } from "./health/health.controller";

const v1_router = new OpenAPIHono();
v1_router.openapi(healthRoute, healthController);
export default v1_router;
