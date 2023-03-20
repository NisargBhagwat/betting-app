import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HttpService from "../../services/http";
import { Root } from '../Root'

const recordsPerPage = 12;
const colorCode: any = {
    green: "#32B590",
    violet: "#8244E1",
    red: "#F95656"
}

export const Histroy = () => {
    const [history, setHistory] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(0);

    const getHistory = async () => {
        try {
            const data = await HttpService.getHistory();
            setHistory(data);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getHistory();
    }, []);

    return (
        <Root>
            <div className="page-wrape">
                <div className="patient-list-area">
                    <div className="container-fluid">
                        <div className="section-header">
                            <div className="row align-items-center">
                                <div className="col-6">
                                    <div className="section-title">
                                        <h2 className="title">History</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="patient-list" style={{ minHeight: "750px" }}>
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">Period</th>
                                            <th scope="col">Game Type</th>
                                            <th scope="col">Open Price</th>
                                            <th scope="col">Total Bet</th>
                                            <th scope="col">Earning</th>
                                            <th scope="col">Number</th>
                                            <th scope="col">Color</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            history.slice(page * recordsPerPage, (page + 1) * recordsPerPage).map((data: any) => (
                                                <tr key={data._id}>
                                                    <td>{data.period}</td>
                                                    <td>{data.gameType}</td>
                                                    <td>{data.price}</td>
                                                    <td>{Number(data.amount).toFixed(2)}</td>
                                                    <td>{Number(data.amount - data.price).toFixed(2)}</td>
                                                    <td>{data.number}</td>
                                                    <td>
                                                        <button style={{
                                                            ...(data.color.length == 1 && { backgroundColor: colorCode[data.color[0]] }),
                                                            height: "40px",
                                                            width: "100px",
                                                            ...(data.color.length == 2 && { background: `linear-gradient(-20deg, ${colorCode[data.color[0]]}  50%, ${colorCode[data.color[1]]}  50%)` }),
                                                            borderRadius: "10px",
                                                            border: "none"
                                                        }} />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="pagination-area mt-10">
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="shoing-reselt m-0">Showing {history.length > 12 ? 12 : history.length} from {history.length} data</p>
                                </div>
                                <div className="col-sm-6 text-left text-sm-right">
                                    <ul className="pagination-list">
                                        {page != 0 && <li className="Previous">
                                            <a onClick={() => setPage(page - 1)}>
                                                <i className="flaticon-left-arrow"></i> Previous
                                            </a>
                                        </li>}
                                        {page <= Math.ceil((history.length / recordsPerPage) - 1) && <li className={`page ${"active"}`}>
                                            <a onClick={() => setPage(page)}>{page + 1}</a>
                                        </li>}
                                        {page + 1 <= Math.ceil((history.length / recordsPerPage) - 1) && <li className="page">
                                            <a onClick={() => setPage(page + 1)}>{page + 2}</a>
                                        </li>}
                                        {page + 2 <= Math.ceil((history.length / recordsPerPage) - 1) && <li className="page">
                                            <a onClick={() => setPage(page + 2)}>{page + 3}</a>
                                        </li>}
                                        {page + 3 <= Math.ceil((history.length / recordsPerPage) - 1) && <li className="page">
                                            <a onClick={() => setPage(page + 3)}>{page + 4}</a>
                                        </li>}
                                        {page + 4 <= Math.ceil((history.length / recordsPerPage) - 1) && <li className="next">
                                            <a onClick={() => setPage(page + 1)}>
                                                Next <i className="flaticon-next"></i>
                                            </a>
                                        </li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Root >
    )
}

