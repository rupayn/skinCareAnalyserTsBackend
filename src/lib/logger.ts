import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const loggerOptions: pino.LoggerOptions = {
  formatters: {
    level: (label) => ({
      level: label,
    }),
  },
  level: "trace",
  redact: {
    censor: "[REDACTED]",
    paths: [
      "password",
      "token",
      "accessToken",
      "refreshToken",
      "authorization",
      "req.headers.authorization",
      "req.headers.cookie",
    ],
  },
  timestamp: pino.stdTimeFunctions.isoTime,
};

if (isProduction) {
  loggerOptions.level = "warn";
} else {
  loggerOptions.transport = {
    options: {
      colorize: true,
      translateTime: "SYS:standard",
    },
    target: "pino-pretty",
  };
}

export const logger = pino(loggerOptions);
