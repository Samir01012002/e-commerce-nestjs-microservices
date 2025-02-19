import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  MAIL_USER: string;
  MAIL_PASS: string;
  KAFKA_BROKER_ADDRESS: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    MAIL_USER: joi.string().required(),
    MAIL_PASS: joi.string().required(),
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
  mail_user: envVars.MAIL_USER,
  mail_pass: envVars.MAIL_PASS,
  kafkaBrokerAddress: envVars.KAFKA_BROKER_ADDRESS,
};
