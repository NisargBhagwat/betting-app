export interface Env {
    NODE_ENV: string;
    PORT: number;
    MONGO_URL: string;
    JWT_SECRET_KEY: string;
    FAST2SMS_AUTHORIZATION_KEY: string;
    TRANSACTION_CHARGES: number;
    PAYTM_MID: string;
    PAYTM_MERCHANT_KEY: string;
    PAYTM_WEBSITE: string;
    RAZORPAY_ID: string;
    RAZORPAY_KEY_SECRET: string;
    RAZORPAY_ACCOUNT_NO: string;
    RAZORPAY_IFSC: string;
}