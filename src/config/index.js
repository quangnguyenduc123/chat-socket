import dotenv from 'dotenv'
import joi from 'joi'

dotenv.config()

// define validation for all the env vars
const envVarsSchema = joi
  .object({
    // Back-end Server port
    PORT: joi.number().default(3000),
    //URL
    API_BASE_URI: joi.string().required(),
    // DB (Amazon Aurora Master)
    DB_HOST: joi
      .string()
      .required()
      .description('Aurora writer host is required'),
    DB_PORT: joi.number().default(3306),
    DB_USER: joi
      .string()
      .required()
      .description('Aurora writer user is required'),
    DB_PASSWORD: joi
      .string()
      .required()
      .description('Aurora writer password is required'),
    DB_DATABASE: joi
      .string()
      .required()
      .description('Aurora writer database is required'),
    DB_POOL_MAX: joi
      .number()
      .required()
      .default(10),
    DB_POOL_IDLE: joi
      .number()
      .required()
      .default(10),
    DB_POOL_ACQUIRE: joi
      .number()
      .required()
      .default(10),

    /* Danger: It is a tuning item when executing multiple queries. */
    MULTIPLE_QUERY_COUNT: joi
      .number()
      .default(1000)
      .min(100)
      .max(10000),

    // Access limit
    EXTERNAL_API_TIME_LIMIT: joi
      .number()
      .min(0)
      .default(600000)
      .description(
        'How long in milliseconds to keep records of requests in memory.'
      ),
    EXTERNAL_API_REQUEST_LIMIT: joi
      .number()
      .min(1)
      .default(1000)
      .description(
        'Max number of connections during EXTERNAL_API_TIME_LIMIT milliseconds before sending a 429 response.'
      ),
  })
  .unknown()
  .required()

const { error, value: config } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default config
