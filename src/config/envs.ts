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
}
const defaultPort = 3001;
export const envs: envInterface = {
  NODE_ENV: valueOrDefault(process.env.NODE_ENV, "production", String),
  PORT: valueOrDefault(process.env.PORT, defaultPort, Number),
};
