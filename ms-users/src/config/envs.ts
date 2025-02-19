import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST: string;
  HASH_SALT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST: joi.string().required(),
    HASH_SALT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  host: envVars.HOST,
  hash_salt: envVars.HASH_SALT,
};
