import "dotenv/config";
/* oxlint-disable id-length */
const valueOrDefault = function valueOrDefault<T>(
  value: string | undefined,
  alt: T,
  parse: (value: string) => T
): T {
  if (value === undefined) {
    return alt;
  }
  return parse(value);
};
/* oxlint-enable id-length */
interface envInterface {
  NODE_ENV: string;
  PORT: number;
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  DYNAMODB_ENDPOINT: string;
  DYNAMODB_TABLE: string;
}
const defaultPort = 3001;
export const envs: envInterface = {
  NODE_ENV: valueOrDefault(process.env.NODE_ENV, "production", String),
  PORT: valueOrDefault(process.env.PORT, defaultPort, Number),
  AWS_REGION: valueOrDefault(process.env.AWS_REGION, "ap-south-1", String),
  AWS_ACCESS_KEY_ID: valueOrDefault(process.env.AWS_ACCESS_KEY_ID, "local", String),
  AWS_SECRET_ACCESS_KEY: valueOrDefault(process.env.AWS_SECRET_ACCESS_KEY, "local", String),
  DYNAMODB_ENDPOINT: valueOrDefault(process.env.DYNAMODB_ENDPOINT, "http://localhost:8000", String),
  DYNAMODB_TABLE: valueOrDefault(process.env.DYNAMODB_TABLE, "AiSkinCareDB", String),
};
