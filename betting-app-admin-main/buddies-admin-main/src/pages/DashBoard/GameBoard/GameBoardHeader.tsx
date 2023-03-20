import { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify';
import HttpService from '../../../services/http';
import { gameTypes } from '../../../utils/globalConst';

const GameBoardHeader = ({ gameType, gameHandler }: any) => {
    const [giveAwayPer, setGiveAwayPer] = useState<number>(10);

    const updatePer = async (per: number) => {
        await HttpService.updatePricePercentage(per);
        setGiveAwayPer(per);
    }

    const getPercentage = async () => {
        try {
            const percentage = await HttpService.getPricePercentage();
            setGiveAwayPer(percentage);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getPercentage();
    }, []);

    return (
        <div className="section-header">
            <div className="section-title">
                <h2 className="title">Game Board</h2>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "flex-end",
            }}>
                <Dropdown className='px-2'>
                    <Dropdown.Toggle className='win-per'>
                        {gameType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ border: "none" }}>
                        {gameTypes
                            .filter((game: string) => game != gameType)
                            .map((game: string, i: number) =>
                                <Dropdown.Item
                                    key={i}
                                    className="per"
                                    onClick={() => gameHandler(game)}
                                >{game}</Dropdown.Item>
                            )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle className='win-per'>
                        {giveAwayPer}%
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ border: "none" }}>
                        {[...Array(10)].map((x: any, i: number) =>
                            <Dropdown.Item
                                key={i}
                                eventKey={i + 1}
                                className="per"
                                onClick={() => updatePer((i + 1) * 10)}
                            >{(i + 1) * 10}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default GameBoardHeader