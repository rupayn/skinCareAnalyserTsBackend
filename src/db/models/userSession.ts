/* oxlint-disable no-template-curly-in-string */
import { Entity } from "electrodb";
import { randomUUID } from "node:crypto";
import { envs } from "@/config";
import { Client } from "../connection/dynamoDbConnect";

export const UserSession = new Entity(
  {
    model: {
      entity: "userSession",
      service: "skincare",
      version: "1",
    },

    attributes: {
      sessionId: {
        type: "string",
        required: true,
        default: (): string => randomUUID(),
      },

      userId: {
        type: "string",
        required: true,
      },

      refreshTokenHash: {
        type: "string",
        required: true,
      },

      deviceName: {
        type: "string",
      },

      browser: {
        type: "string",
      },

      operatingSystem: {
        type: "string",
      },

      ipAddress: {
        type: "string",
      },

      createdAt: {
        type: "string",
        default: (): string => new Date().toISOString(),
        readOnly: true,
      },

      lastActiveAt: {
        type: "string",
        default: (): string => new Date().toISOString(),
      },

      expiresAt: {
        type: "number",
        required: true,
      },

      revokedAt: {
        type: "string",
      },

      isRevoked: {
        type: "boolean",
        default: false,
      },
    },

    indexes: {
      primary: {
        pk: {
          field: "PK",
          composite: ["userId"],
          // oxlint-disable-next-line no-template-curly-in-string
          template: "USER#${userId}",
        },
        sk: {
          field: "SK",
          composite: ["sessionId"],
          // oxlint-disable-next-line no-template-curly-in-string
          template: "SESSION#${sessionId}",
        },
      },
    },
  },
  {
    table: envs.DYNAMODB_TABLE,
    client: Client,
  }
);
