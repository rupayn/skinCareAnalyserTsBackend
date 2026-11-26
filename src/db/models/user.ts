import { Entity } from "electrodb";
import { randomUUID } from "node:crypto";
import { envs } from "@/config";
import { Client } from "../connection/dynamoDbConnect";

export const User = new Entity(
  {
    model: {
      entity: "user",
      service: "skincare",
      version: "1",
    },
    attributes: {
      userId: {
        type: "string",
        required: true,
        readOnly: true,
        default: (): string => randomUUID(),
      },
      name: {
        type: "string",
        required: true,
      },
      email: {
        type: "string",
        required: true,
        set: (value): string | undefined => value?.trim().toLowerCase(),
      },

      passwordHash: {
        type: "string",
        required: true,
      },

      emailVerified: {
        type: "boolean",
        default: false,
      },

      createdAt: {
        type: "string",
        default: (): string => new Date().toISOString(),
        readOnly: true,
      },

      updatedAt: {
        type: "string",
        default: (): string => new Date().toISOString(),
        watch: "*",
        set: (): string => new Date().toISOString(),
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
          composite: [],
          template: "USER",
        },
      },
      byEmail: {
        index: "EmailIndex",
        pk: {
          field: "GSI1PK",
          composite: ["email"],
          // oxlint-disable-next-line no-template-curly-in-string
          template: "EMAIL#${email}",
        },
        sk: {
          field: "GSI1SK",
          composite: ["userId"],
          // oxlint-disable-next-line no-template-curly-in-string
          template: "USER#${userId}",
        },
      },
    },
  },
  {
    table: envs.DYNAMODB_TABLE,
    client: Client,
  }
);
