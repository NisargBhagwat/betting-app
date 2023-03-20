import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HttpService from '../../services/http';
import { Root } from '../Root'

const queriesPerPage = 12;

export const Query = () => {
    const [queries, setQuries] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(0);

    const statusUpdate = async (queryId: string, index: number) => {
        try {
            await HttpService.queryStatusUpdate(queryId);
            setQuries((state: any) => {
                state[index].status = "resolved";
                return [...state];
            });
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    const getQuereis = async () => {
        try {
            const data = await HttpService.getQuereis();
            setQuries(data);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getQuereis();
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
                                        <h2 className="title">Queries</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="patient-list" style={{ minHeight: "750px" }}>
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Query</th>
                                            <th scope="col">CreatedAt</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            queries.slice(page * queriesPerPage, (page + 1) * queriesPerPage).map((data: any, index: number) => (
                                                <tr key={data._id}>
                                                    <td>{data.email}</td>
                                                    <td>{data.phone}</td>
                                                    <td style={{
                                                        width: "30%",
                                                    }}>{data.query}</td>
                                                    <td>{data.createdAt}</td>
                                                    <td>
                                                        {data.status == "pending" && <button style={{
                                                            backgroundColor: "#F95656",
                                                            height: "40px",
                                                            width: "100px",
                                                            borderRadius: "10px",
                                                            border: "none",
                                                            color: "white"
                                                        }}
                                                            onClick={() => statusUpdate(data._id!, index)}
                                                        >pending</button>}
                                                        {data.status == "resolved" && <button style={{
                                                            backgroundColor: "#32B590",
                                                            height: "40px",
                                                            width: "100px",
                                                            borderRadius: "10px",
                                                            border: "none",
                                                            color: "white"
                                                        }} disabled={true}>resolved</button>}
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
                                    <p className="shoing-reselt m-0">Showing {queries.length > 12 ? 12 : queries.length} from {queries.length} data</p>
                                </div>
                                <div className="col-sm-6 text-left text-sm-right">
                                    <ul className="pagination-list">
                                        {page != 0 && <li className="Previous">
                                            <a onClick={() => setPage(page - 1)}>
                                                <i className="flaticon-left-arrow"></i> Previous
                                            </a>
                                        </li>}
                                        {page <= Math.ceil((queries.length / queriesPerPage) - 1) && <li className={`page ${"active"}`}>
                                            <a onClick={() => setPage(page)}>{page + 1}</a>
                                        </li>}
                                        {page + 1 <= Math.ceil((queries.length / queriesPerPage) - 1) && <li className="page">
                                            <a onClick={() => setPage(page + 1)}>{page + 2}</a>
                                        </li>}
                                        {page + 2 <= Math.ceil((queries.length / queriesPerPage) - 1) && <li className="page">
                                            <a onClick={() => setPage(page + 2)}>{page + 3}</a>
                                        </li>}
                                        {page + 3 <= Math.ceil((queries.length / queriesPerPage) - 1) && <li className="page">
                                            <a onClick={() => setPage(page + 3)}>{page + 4}</a>
                                        </li>}
                                        {page + 4 <= Math.ceil((queries.length / queriesPerPage) - 1) && <li className="next">
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
        </Root>
    )
}
