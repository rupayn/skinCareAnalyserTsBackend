/* oxlint-disable no-template-curly-in-string */
import { Entity } from "electrodb";
import { envs } from "@/config";
import { Client } from "../connection/dynamoDbConnect";

export const UserProfile = new Entity(
  {
    model: {
      entity: "userProfile",
      service: "skincare",
      version: "1",
    },

    attributes: {
      userId: {
        type: "string",
        required: true,
      },

      skinType: {
        type: ["OILY", "DRY", "NORMAL", "COMBINATION", "SENSITIVE"] as const,
      },

      skinIssues: {
        type: "list",
        items: {
          type: "string",
        },
        default: [],
      },

      allergies: {
        type: "list",
        items: {
          type: "string",
        },
        default: [],
      },

      skinSensitivity: {
        type: ["LOW", "MODERATE", "HIGH"] as const,
      },

      age: {
        type: "number",
      },

      gender: {
        type: ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"] as const,
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
          template: "USER#${userId}",
        },

        sk: {
          field: "SK",
          composite: [],
          template: "PROFILE",
        },
      },
    },
  },
  {
    table: envs.DYNAMODB_TABLE,
    client: Client,
  }
);
