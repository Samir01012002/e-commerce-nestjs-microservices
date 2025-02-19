import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST: string;
  KAFKA_BROKER_ADDRESS: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST: joi.string().required(),
    KAFKA_BROKER_ADDRESS: joi.string().required(),
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
  kafkaBrokerAddress: envVars.KAFKA_BROKER_ADDRESS,
};
