import { envs } from "@/config";
import { DynamoDBClient, type DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const clientData: DynamoDBClientConfig = {
  region: envs.AWS_REGION,
};
if (envs.NODE_ENV !== "production") {
  clientData.endpoint = envs.DYNAMODB_ENDPOINT;
}
export const Client = DynamoDBDocumentClient.from(new DynamoDBClient(clientData));
