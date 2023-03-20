import { body, query } from "express-validator";

export const tokenBodyDto = [
    body("amount")
        .isNumeric().withMessage("InValid amount!")
]

export const orderIdDto = [
    query("orderId")
        .isMongoId().withMessage("Invalid orderId!")
]

export const paymentQueryDto = [
    query("amount")
        .isNumeric().withMessage("Invalid amount!")
        .toInt()
]

export const paymentVerifyBodyDto = [
    body("razorpay_payment_id")
        .isString()
        .notEmpty().withMessage("Invalid razorpay_payment_id!")
        .trim(),

    body("razorpay_order_id")
        .isString()
        .notEmpty().withMessage("Invalid razorpay_payment_id!")
        .trim(),

    body("razorpay_signature")
        .isString()
        .notEmpty().withMessage("Invalid razorpay_payment_id!")
        .trim(),
]