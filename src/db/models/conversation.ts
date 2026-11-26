/* oxlint-disable no-template-curly-in-string */
import { Entity } from "electrodb";
import { randomUUID } from "node:crypto";
import { envs } from "@/config";
import { Client } from "../connection/dynamoDbConnect";

export const Conversation = new Entity(
  {
    model: {
      entity: "conversation",
      service: "skincare",
      version: "1",
    },

    attributes: {
      conversationId: {
        type: "string",
        required: true,
        default: (): string => randomUUID(),
      },

      userId: {
        type: "string",
        required: true,
      },

      title: {
        type: "string",
        required: true,
        default: "New Conversation",
      },

      lastMessage: {
        type: "string",
      },

      messageCount: {
        type: "number",
        default: 0,
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

      isArchived: {
        type: "boolean",
        default: false,
      },

      isDeleted: {
        type: "boolean",
        default: false,
      },
    },

    indexes: {
      primary: {
        pk: {
          field: "PK",
          composite: ["userId"],
          template: "USER#${userId}",
        },

        sk: {
          field: "SK",
          composite: ["conversationId"],
          template: "CONVERSATION#${conversationId}",
        },
      },
    },
  },
  {
    table: envs.DYNAMODB_TABLE,
    client: Client,
  }
);
