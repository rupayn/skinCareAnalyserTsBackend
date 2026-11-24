import { envs } from "./config/envs";
import { app } from "./index";
import { logger } from "@/lib";
import { serve } from "@hono/node-server";
if (envs.NODE_ENV !== "production") {
  serve({ fetch: app.fetch, port: envs.PORT }, (info) => {
    logger.warn(`http://localhost:${info.port}`);
  });
}
