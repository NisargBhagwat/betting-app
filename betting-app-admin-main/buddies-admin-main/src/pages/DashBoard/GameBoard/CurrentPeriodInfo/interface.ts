import { Socket } from "socket.io-client"

export interface CurrentPeriod {
    gameType: string,
    period: number,
    startTime: number,
    endTime: number
}

export interface Props {
    gameType: string;
    socket: Socket;
    setCurrentPeriod: Function;
    boardResult: any;
}