/* oxlint-disable no-template-curly-in-string */
import { Entity } from "electrodb";
import { randomUUID } from "node:crypto";
import { envs } from "@/config";
import { Client } from "../connection/dynamoDbConnect";

export const Message = new Entity(
  {
    model: {
      entity: "message",
      service: "skincare",
      version: "1",
    },

    attributes: {
      messageId: {
        type: "string",
        required: true,
        default: (): string => randomUUID(),
      },

      userId: {
        type: "string",
        required: true,
      },

      conversationId: {
        type: "string",
        required: true,
      },

      role: {
        type: ["USER", "ASSISTANT", "SYSTEM"] as const,
        required: true,
      },

      content: {
        type: "string",
        required: true,
      },

      createdAt: {
        type: "string",
        default: (): string => new Date().toISOString(),
        readOnly: true,
      },

      metadata: {
        type: "map",
        properties: {
          model: {
            type: "string",
          },
          inputTokens: {
            type: "number",
          },
          outputTokens: {
            type: "number",
          },
        },
      },
    },

    indexes: {
      primary: {
        pk: {
          field: "PK",
          composite: ["userId", "conversationId"],
          template: "USER#${userId}#CONVERSATION#${conversationId}",
        },

        sk: {
          field: "SK",
          composite: ["createdAt", "messageId"],
          template: "MESSAGE#${createdAt}#${messageId}",
        },
      },
    },
  },
  {
    table: envs.DYNAMODB_TABLE,
    client: Client,
  }
);
