import Joi, { } from "joi";
import { resolve } from "path";
import { config } from "dotenv";

import { Env } from "../common/interface/env.interface";

let envPath: string;

if (process.env.NODE_ENV === 'development') {
    envPath = resolve(process.cwd(), '.env.development')
} else if (process.env.NODE_ENV === 'stage') {
    envPath = resolve(process.cwd(), '.env.stage')
} else if (process.env.NODE_ENV === 'production') {
    envPath = resolve(process.cwd(), '.env.stage')
} else {
    envPath = resolve(process.cwd(), '.env.development')
}

config({ path: envPath });

// define validation for all the env vars
const envVarsSchema: Joi.ObjectSchema<Env> = Joi.object({
    NODE_ENV: Joi.string().allow('development', 'production', 'stage').default('developmenet'),
    PORT: Joi.number().default(3000),
    MONGO_URL: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    FAST2SMS_AUTHORIZATION_KEY: Joi.string().required(),
    TRANSACTION_CHARGES: Joi.number().required(),
    PAYTM_MID: Joi.string().required(),
    PAYTM_MERCHANT_KEY: Joi.string().required(),
    PAYTM_WEBSITE: Joi.string().required(),
    RAZORPAY_ID: Joi.string().required(),
    RAZORPAY_KEY_SECRET: Joi.string().required(),
    RAZORPAY_ACCOUNT_NO: Joi.string().required(),
    RAZORPAY_IFSC: Joi.string().required()
})
    .unknown()
    .required();

const { error, value: envVars }: Joi.ValidationResult<Env> = envVarsSchema.validate(process.env);

if (error) {
    console.log('\n envVars', envVars);
    throw new Error(`Config validation error: ${error.message}`)
}

const env: Env = {
    NODE_ENV: envVars.NODE_ENV,
    PORT: envVars.PORT,
    MONGO_URL: envVars.MONGO_URL,
    JWT_SECRET_KEY: envVars.JWT_SECRET_KEY,
    FAST2SMS_AUTHORIZATION_KEY: envVars.FAST2SMS_AUTHORIZATION_KEY,
    TRANSACTION_CHARGES: envVars.TRANSACTION_CHARGES,
    PAYTM_MID: envVars.PAYTM_MID,
    PAYTM_MERCHANT_KEY: envVars.PAYTM_MERCHANT_KEY,
    PAYTM_WEBSITE: envVars.PAYTM_WEBSITE,
    RAZORPAY_ID: envVars.RAZORPAY_ID,
    RAZORPAY_KEY_SECRET: envVars.RAZORPAY_KEY_SECRET,
    RAZORPAY_ACCOUNT_NO: envVars.RAZORPAY_ACCOUNT_NO,
    RAZORPAY_IFSC: envVars.RAZORPAY_IFSC
}

export default env;
