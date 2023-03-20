import { Root } from '../Root';
import { GameBoard } from "./GameBoard";

export const DashBoard = () => {
    return (
        <Root>
            <div className="page-wrape">
                <div className="welcome-area">
                    <GameBoard />
                </div>
            </div>
        </Root >
    )
}
