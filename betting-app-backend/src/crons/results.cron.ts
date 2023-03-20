import * as cron from "node-cron";
import { getPeriod } from "../utils/utils";
import resultsService from "../common/results/results.service";
import { logger } from "../utils/logger";

// result Initlialiation cron 
cron.schedule("*/3 * * * *", async () => {
    try {
        const date: Date = new Date();
        const period: number = getPeriod(date);

        await resultsService.initializeResult(period, date);

        setTimeout(async () => {
            await resultsService.resultDeclaration(period);
        }, 175 * 1000);

        const nextDate: Date = new Date(date.getTime() + 180 * 1000);
        const nextPeriod: number = getPeriod(nextDate);

        await resultsService.initializeFutureResult(nextPeriod, date);

        logger.info(`[Initialized Result Executed Successfully] ===> Activity Cron`);
    }
    catch (error: any) {
        console.log(error);
        logger.error(`[Cron Error] ===> Activity Cron:: Message:: ${error.message}, \n Stack:: ${error.stack || 'something went wrong'}`);
    }
});

cron.schedule("0 0 * * *", async () => {
    try {
        await resultsService.deleteResults();

        logger.info(`[Initialized Delete Result Executed Successfully] ===> Activity Cron`);
    }
    catch (error: any) {
        console.log(error);
        logger.error(`[Cron Error] ===> Activity Cron:: Message:: ${error.message}, \n Stack:: ${error.stack || 'something went wrong'}`);
    }
});


