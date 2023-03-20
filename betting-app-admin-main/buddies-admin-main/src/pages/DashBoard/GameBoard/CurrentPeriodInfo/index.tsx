import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HttpService from "../../../../services/http";
import { colorCode } from "../../../../utils/globalConst";
import initializeSocket from "../../../../utils/socket";

interface CurrentPeriod {
    gameType: string,
    period: number,
    startTime: number,
    endTime: number
}

const CurrentPeriodInfo = ({ gameType, setCurrentPeriod, boardResult, totalBet, setOverlay }: any) => {
    const [gameInfo, setGameInfo] = useState<CurrentPeriod | null>(null);
    const [timer, setTimer] = useState<string>("00:00");
    const getCurrentPeriod = async () => {
        try {
            const periodData: CurrentPeriod = await HttpService.getCurrentPeriod(gameType);
            setGameInfo(periodData);
            setCurrentPeriod(periodData.period);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    const initiateSocketEvents = () => {
        const socket = initializeSocket();
        socket.on("newPeriod", ((data: CurrentPeriod[]) => {
            const currentInfo: CurrentPeriod = data.find((gameInfo) => gameInfo.gameType = gameType)!;
            setGameInfo(currentInfo);
            setCurrentPeriod(currentInfo.period);
        }));
    }

    useEffect(() => {
        getCurrentPeriod();
    }, []);

    useEffect(() => {
        initiateSocketEvents();
    }, []);

    const intervalHandler = () => {
        const countDown = setInterval(function () {
            const now = new Date().getTime();
            const distance = gameInfo?.endTime! - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimer(`${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);

            if (minutes == 0 && seconds == 30) {
                setOverlay(false);
            }
            if (minutes == 0 && seconds == 15) {
                setOverlay(true);
            }

            if (minutes == 0 && seconds == 1) {
                clearInterval(countDown);
            }

            if (minutes < 0 || seconds < 0) {
                window.location.reload();
            }
        }, 1000);
    }

    useEffect(() => {
        if (gameInfo) {
            intervalHandler();
        }
    }, [gameInfo]);

    return (
        <div className="row">
            <div className="single-welcome col-lg">
                <div className="media align-items-center">
                    <div className="media-body game-board">
                        <div>
                            <p className="m-0 game-board-text">Period</p>
                            <h3 className="counter">
                                {
                                    gameInfo ? gameInfo.period : ""
                                }
                            </h3>
                        </div>
                        <div>
                            <p className="m-0 game-board-text">Total Bet Amount</p>
                            <h3 className="counter">{Number(totalBet).toFixed(2)}</h3>
                        </div>
                        <div>
                            <p className="m-0 game-board-text">Count Down</p>
                            <h3 className="counter">{timer}</h3>
                        </div>
                        <div>
                            <p className="m-0 game-board-text">final Result</p>
                            <div className='final-result-section'>
                                {
                                    boardResult &&
                                    <>
                                        <button style={{
                                            ...(boardResult.color.length == 1 && { backgroundColor: colorCode[boardResult.color[0]] }),
                                            ...(boardResult.color.length == 2 && { background: `linear-gradient(-10deg, ${colorCode[boardResult.color[0]]}  50%, ${colorCode[boardResult.color[1]]}  50%)` }),
                                        }} >
                                            {boardResult.number}
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentPeriodInfo