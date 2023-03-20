import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HttpService from '../../services/http';
import { Root } from '../Root'
const recordsPerPage = 12;

export const User = () => {
    const [users, setUsers] = useState<any>([]);
    const [page, setPage] = useState<number>(0);

    const getUsers = async () => {
        try {
            const data = await HttpService.getUsers();
            setUsers(data);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getUsers();
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
                                        <h2 className="title">Users</h2>
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
                                        <th scope="col">Joined From</th>
                                        <th scope="col">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.slice(page * recordsPerPage, (page + 1) * recordsPerPage).map((data: any) => (
                                            <tr key={data._id}>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                                <td>{data.createdAt}</td>
                                                <td>{Number(data.balance).toFixed(2)}</td>
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
                                <p className="shoing-reselt m-0">Showing {users.length > 12 ? 12 : users.length} from {users.length} data</p>
                            </div>
                            <div className="col-sm-6 text-left text-sm-right">
                                <ul className="pagination-list">
                                    {page != 0 && <li className="Previous">
                                        <a onClick={() => setPage(page - 1)}>
                                            <i className="flaticon-left-arrow"></i> Previous
                                        </a>
                                    </li>}
                                    {page <= Math.ceil((users.length / recordsPerPage) - 1) && <li className={`page ${"active"}`}>
                                        <a onClick={() => setPage(page)}>{page + 1}</a>
                                    </li>}
                                    {page + 1 <= Math.ceil((users.length / recordsPerPage) - 1) && <li className="page">
                                        <a onClick={() => setPage(page + 1)}>{page + 2}</a>
                                    </li>}
                                    {page + 2 <= Math.ceil((users.length / recordsPerPage) - 1) && <li className="page">
                                        <a onClick={() => setPage(page + 2)}>{page + 3}</a>
                                    </li>}
                                    {page + 3 <= Math.ceil((users.length / recordsPerPage) - 1) && <li className="page">
                                        <a onClick={() => setPage(page + 3)}>{page + 4}</a>
                                    </li>}
                                    {page + 4 <= Math.ceil((users.length / recordsPerPage) - 1) && <li className="next">
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
