import { toast } from 'react-toastify';
import HttpService from '../../../../services/http';
import { colorCode } from '../../../../utils/globalConst'

const BoardList = ({ boardData, number, setNumber, period, overlay, setOverlay }: any) => {

    const numberSelectHandler = async (number: number) => {
        try {
            await HttpService.setResult({
                gameType: boardData.gameType,
                period,
                number
            });
            setNumber(number);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    console.log(overlay)
    return (
        <>
            {
                boardData &&
                <>
                    <div className="patient-list-area" >
                        <div className="patient-list" style={{ textAlign: "center" }}>
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">Colors</th>
                                            <th scope="col">Bet Amount</th>
                                            <th scope="col">Loss (%)</th>
                                            <th scope="col">Price Amount</th>
                                            <th scope="col">Earn Amount</th>
                                            <th scope="col">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ position: "relative" }}>
                                        {
                                            boardData.gameBoard.map((combo: any, i: number) => (
                                                <tr key={i}>
                                                    <td style={{ width: "10%" }}>
                                                        <button className='color-combination' style={{
                                                            ...(combo.color.length == 1 && { backgroundColor: colorCode[combo.color[0]] }),
                                                            ...(combo.color.length == 2 && { background: `linear-gradient(-10deg, ${colorCode[combo.color[0]]}  50%, ${colorCode[combo.color[1]]}  50%)` }),
                                                        }} >{combo.number}</button></td>
                                                    <td>{Number(combo.betAmount).toFixed(2)}</td>
                                                    <td>{Math.round(Number(combo.loss))}%</td>
                                                    <td>{Number(combo.lossAmount).toFixed(2)}</td>
                                                    <td>{Number(combo.earnAmount).toFixed(2)}</td>
                                                    <td style={{ width: "10%" }} >
                                                        <button
                                                            className={`${number == combo.number ? "selected-result" : "selecte-result"} ${overlay && "overlay"}`}
                                                            disabled={number == combo.number || overlay}
                                                            onClick={() => numberSelectHandler(combo.number)}>
                                                            {number == combo.number ? "selected" : "select"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default BoardList