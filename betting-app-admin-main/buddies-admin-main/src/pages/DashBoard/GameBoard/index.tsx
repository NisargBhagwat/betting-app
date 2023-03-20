import { useEffect, useState } from "react";
import BoardList from './BoardList';
import { toast } from 'react-toastify';
import CurrentPeriodInfo from './CurrentPeriodInfo';
import GameBoardHeader from './GameBoardHeader';
import HttpService from "../../../services/http";
import { gameColors } from "../../../utils/globalConst";
import initializeSocket from "../../../utils/socket";
import { Welcome } from "./Welcome";

export const GameBoard = () => {
    const [gameType, setGameType] = useState<string>("Parity");
    const [period, setPeriod] = useState<number | null>(null);
    const [allGameBoardList, setAllGameBoardList] = useState<any>(null);
    const [slectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [overlay, setOverlay] = useState<boolean>(true);
    let selectedBoardList: any;

    const getCurrentPeriod = async () => {
        try {
            const boardListData = await HttpService.getCurrentEstimatedResult(period!);
            setAllGameBoardList(boardListData);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    const initiateSocketEvents = () => {
        const socket = initializeSocket();
        socket.on("newRecord", ((newAllGameBoardList: any) => {
            setAllGameBoardList(newAllGameBoardList);
        }));
    }

    useEffect(() => {
        if (period) {
            getCurrentPeriod();
        }
    }, [period]);

    useEffect(() => {
        initiateSocketEvents();
    }, []);

    const gameHandler = (game: string) => setGameType(game);

    const setCurrentPeriod = (currentPeriod: number) => {
        setSelectedNumber(null);
        setPeriod(currentPeriod);
    };

    const selectNumber = (number: number) => {
        setSelectedNumber(number)
        let gameBoardData = [...allGameBoardList];
        const index = allGameBoardList.findIndex((data: any) => data.gameType == gameType);
        gameBoardData[index].finalResult = {
            number: number,
            color: gameColors[number]
        }
        setAllGameBoardList(gameBoardData);
    };

    if (allGameBoardList) {
        selectedBoardList = allGameBoardList.find((data: any) => gameType == data.gameType);
    }

    return (
        <>
            <Welcome period={period}/>
            <div className="container-fluid game-board-section">
                <GameBoardHeader
                    gameType={gameType}
                    gameHandler={gameHandler}
                />
                <CurrentPeriodInfo  
                    gameType={gameType}
                    setCurrentPeriod={setCurrentPeriod}
                    boardResult={selectedBoardList && selectedBoardList.finalResult}
                    totalBet={selectedBoardList && selectedBoardList.totalBetAmount}
                    setOverlay={setOverlay}
                />
                {
                    allGameBoardList &&
                    <BoardList
                        boardData={selectedBoardList}
                        number={slectedNumber}
                        setNumber={selectNumber}
                        period={period}
                        overlay={overlay}
                    />
                }
            </div>
        </>
    )
}
