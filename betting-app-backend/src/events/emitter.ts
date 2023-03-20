import { EventEmitter } from "events";

export const resultEventEmitter: EventEmitter = new EventEmitter();
export const recordEventEmitter: EventEmitter = new EventEmitter();

export const NEW_PERIOD: string = "newPeriod";
export const NEW_RECORD: string = "newRecord";

