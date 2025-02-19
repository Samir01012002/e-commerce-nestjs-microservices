import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  API_PORT: number;
  HASH_SALT: number;

  JWT_SECRET: string;
  JWT_EXPIRATION: string;

  USERS_SERVICE_HOST: string;
  USERS_SERVICE_PORT: number;

  ORDERS_SERVICE_HOST: string;
  ORDERS_SERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    API_PORT: joi.number().required(),
    HASH_SALT: joi.number().required(),

    JWT_SECRET: joi.string().required(),
    JWT_EXPIRATION: joi.string().required(),

    USERS_SERVICE_HOST: joi.string().required(),
    USERS_SERVICE_PORT: joi.number().required(),

    ORDERS_SERVICE_HOST: joi.string().required(),
    ORDERS_SERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs = {
  api_port: envVars.API_PORT,
  hash_salt: envVars.HASH_SALT,
  jwt_secret: envVars.JWT_SECRET,
  jwt_expiration: envVars.JWT_EXPIRATION,
  users_service_host: envVars.USERS_SERVICE_HOST,
  users_service_port: envVars.USERS_SERVICE_PORT,
  orders_service_host: envVars.ORDERS_SERVICE_HOST,
  orders_service_port: envVars.ORDERS_SERVICE_PORT,
};
