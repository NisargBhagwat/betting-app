import { Request, Response, NextFunction, response } from "express";
import https from "https";
import { genchecksumbystring } from "../../utils/checksum";
import { Types } from "mongoose";

import { statusCode } from "../../utils/globalConst";
import { responseHandler } from "../../utils/utils";
import HttpException from "../../exceptions/HttpException";
import env from "../../configs/env.config";

import { RequestWithUser } from "../../common/auth/auth.interface";
import { User } from "../../common/users/users.interface";
import paymentService from "./payment.service";
import { TransactionDoc, VerificationBody } from "./payment.interface";
import { number } from "joi";


let instance: null | PaymentController = null;

class PaymentController {

    static getInstance(): PaymentController {
        if (instance == null) {
            instance = new PaymentController();
        }
        return instance;
    }

    public async createTxnToken(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user: User = req.user!;
            const { amount } = req.body;

            let paytmParams: any = {};

            const newTransaction: TransactionDoc = await paymentService.createNewTransaction(user._id!);
            const orderId = newTransaction._id;
            paytmParams.body = {
                requestType: "Payment",
                mid: env.PAYTM_MID,
                websiteName: env.PAYTM_WEBSITE,
                orderId,
                callbackUrl: `http://13.126.252.218:3000/api/v1/payment/paytmCallback?orderId=${orderId}`,
                txnAmount: {
                    value: amount,
                    currency: "INR",
                },
                userInfo: {
                    custId: user._id!,
                },
            };

            genchecksumbystring(
                JSON.stringify(paytmParams.body),
                env.PAYTM_MERCHANT_KEY,
                (err: Error, checksum: string) => {
                    if (err) {
                        throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Something Went Wrong");
                    }

                    paytmParams.head = {
                        signature: checksum,
                    };

                    let post_data = JSON.stringify(paytmParams);

                    let options = {
                        hostname: "securegw-stage.paytm.in",
                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${env.PAYTM_MID}&orderId=${orderId}`,
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Content-Length": post_data.length,
                        },
                    };

                    // Set up the request
                    var response: any = "";
                    var post_req = https.request(options, (post_res: any) => {
                        post_res.on("data", (chunk: any) => {
                            response += chunk;
                        });

                        post_res.on("end", () => {
                            response = JSON.parse(response);
                            response = {
                                txnToken: response.body.txnToken,
                                orderId,
                                mId: env.PAYTM_MID,
                                amount
                            };
                            return res
                                .status(statusCode.OK)
                                .json(responseHandler(response, statusCode.OK, 'success'));
                        });
                    });

                    // post the data
                    post_req.write(post_data);
                    post_req.end();
                }
            );
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async paytmCallback(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { orderId } = req.query as unknown as { orderId: Types.ObjectId };
            const transactionData = req.body;

            const newBalance = await paymentService.completeTranaction(orderId, transactionData);

            return res
                .status(statusCode.OK)
                .json(responseHandler(newBalance, statusCode.OK, 'success'));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getAllTransactions(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user: User = req.user!;

            const allTransactions = await paymentService.getAllTranasactions(user._id!);

            return res
                .status(statusCode.OK)
                .json(responseHandler(allTransactions, statusCode.OK, 'success'));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public getTransactionCharge(req: RequestWithUser, res: Response, next: NextFunction) {

        return res
            .status(statusCode.OK)
            .json(responseHandler({ charge: env.TRANSACTION_CHARGES! }, statusCode.OK, 'success'));
    }

    public async reqPayment(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { amount } = req.query as unknown as { amount: number };
            const user: User = req.user!;

            const orderInfo = await paymentService.getNewRazorPayOrderId(amount, user._id!);

            return res
                .status(statusCode.OK)
                .json(responseHandler(orderInfo, statusCode.OK, 'success'));
        }
        catch (error) {
            next(error);
            console.error(error);
        }
    }

    public async getPaymentKey(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            return res
                .status(statusCode.OK)
                .json(responseHandler({ key: env.RAZORPAY_ID }, statusCode.OK, 'success'));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async verifyPayment(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user: User = req.user!;
            const body: VerificationBody = req.body;

            const balanceInfo = await paymentService.verifyPayment(body, user._id!);

            return res
                .status(statusCode.OK)
                .json(responseHandler(balanceInfo, statusCode.OK, 'success'));
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export default PaymentController.getInstance();


