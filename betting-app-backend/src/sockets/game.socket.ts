import { Server } from "socket.io";
import { Types } from "mongoose";

import { SocketWithUser } from "../common/auth/auth.interface";
import { NEW_PERIOD, NEW_RECORD, recordEventEmitter, resultEventEmitter } from "../events/emitter";
import { UserDoc } from "../common/users/users.interface";
import socketAuthMiddleware from "../middlewares/socketAuth.middleware";
import recordsService from "../consumer/records/records.service";


// class GameSocket {
//     private io: Server;
//     private socket: SocketWithUser;

//     constructor(io: Server, socket: SocketWithUser) {
//         this.io = io;
//         this.socket = socket;

//         this.resultEvents();
//         this.recordEvents();
//         this.deleteSocket();
//     }

//     private resultEvents() {
//         console.info("result events initiallized", this.socket.id);
//         resultEventEmitter.on(NEW_PERIOD, (data: any) => {
//             console.log(data, "result");
//             this.socket.emit(NEW_PERIOD, data);
//         });
//     }

//     private recordEvents() {
//         console.info("record events initiallized", this.socket.id);
//         recordEventEmitter.on(NEW_RECORD, (periodId: Types.ObjectId, period: number) => {
//             console.log(periodId, period, "done");
//         });
//     }

//     private deleteSocket() {
//         this.socket.on("disconnect", () => {
//             console.log("deleted socket");
//             this.deleteSocket();
//         })
//     }
// }

export function gameSocket(io: Server) {
    io.use(async (socket: SocketWithUser, next: Function) => {
        try {
            const userInfo: UserDoc | undefined = await socketAuthMiddleware(socket.handshake.auth.Authorization, true);
            socket.user = userInfo!;

            socket.on("disconnect", () => {
                console.log("deleted socket");
                socket.disconnect();
            })
            next();
        }
        catch (error) {
            console.log(error);
            socket.disconnect();
            next(error);
        }
    })
        .on("connection", (socket: SocketWithUser) => {
            console.log("connected", socket.id);
        })

    resultEventEmitter.on(NEW_PERIOD, (data: any) => {
        try {
            io.emit(NEW_PERIOD, data);
        }
        catch (error) {
            console.log(error);
        }
    });

    recordEventEmitter.on(NEW_RECORD, async (periodId: Types.ObjectId, period: number) => {
        try {
            const result = await recordsService.sendResultToSocket(periodId, period);
            io.emit(NEW_RECORD, result);
        }
        catch (error) {
            console.log(error);
        }
    });
}