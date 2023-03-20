import { Router } from "express";

import Route from "../../common/interface/routes.interface";
import AuthRoute from "../../common/auth/auth.routes";
import UsersRoute from "../../common/users/users.routes";
import ColorsRoute from "../../admin/colors/colors.routes";
import GameTypesRoute from "../../admin/gameTypes/gameTypes.router";
import NumbersRoute from "../../admin/numbers/numbers.router";
import PricesRoute from "../../admin/prices/prices.router";
import PaymentRoute from "../../consumer/payment/payment.routes";
import RecordsRoute from "../../consumer/records/records.routes";
import ResultsRoute from "../../common/results/results.routes";
import QueriesRoute from "../../common/queries/queries.routes";
import PricePercentageRoute from "../../admin/pricePercentage/pricePercentage.routes";
import FundAccountsRoute from "../../consumer/fundAccounts/fundAccounts.routes";
import WithrawalsRoute from "../../consumer/withdrawals/withdrawals.routes";

class V1Routes implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use('/auth', new AuthRoute().router);
        this.router.use('/user', new UsersRoute().router);
        // this.router.use('/color', new ColorsRoute().router);
        // this.router.use('/gameType', new GameTypesRoute().router);
        // this.router.use('/number', new NumbersRoute().router);
        // this.router.use('/price', new PricesRoute().router);
        this.router.use('/payment', new PaymentRoute().router);
        this.router.use('/record', new RecordsRoute().router);
        this.router.use('/result', new ResultsRoute().router);
        this.router.use('/query', new QueriesRoute().router);
        this.router.use('/pricePer', new PricePercentageRoute().router);
        this.router.use('/account', new FundAccountsRoute().router);
        this.router.use('/withdrawal', new WithrawalsRoute().router);
    }
}

export default V1Routes;