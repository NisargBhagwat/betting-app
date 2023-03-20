import {
  useState,
  SyntheticEvent,
} from "react";
import { toast } from "react-toastify";
import HttpService from "../../services/http";
import { Root } from "../Root";

export const Referals = () => {
  const [search, setSearch] = useState("");
  const [referalUsers, setReferalUsers] = useState<any>([]);

  const searchSubmitHandler = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const data = await HttpService.getUserReferals(search);
      if (data.length) {
        setReferalUsers(data);
      } else {
        toast.error("User have no referals!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Root>
      <div className="page-wrape">
        <div className="patient-list-area">
          <div className="container-fluid">
            <div className="section-header">
              <div className="row align-items-center">
                <div className="col-9">
                  <div className="section-title">
                    <h2 className="title">Referals</h2>
                  </div>
                </div>
                <div className="header-area d-block">
                  <div className="search-form">
                    <form onSubmit={searchSubmitHandler}>
                      <div className="form-group mb-0">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Search"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                          <span className="flaticon-loupe"></span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {Boolean(referalUsers.length) && (
              <div className="patient-list" style={{ minHeight: "750px" }}>
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">phone</th>
                        <th scope="col">email</th>
                        <th scope="col">balance</th>
                        <th scope="col">bet Amount</th>
                        <th scope="col">earn Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referalUsers.map((data: any) => (
                        <tr key={data._id}>
                          <td>{data.user.phone}</td>
                          <td>{data.user.email}</td>
                          <td>{Number(data.user.balance).toFixed(2)}</td>
                          <td>{data.betAmount}</td>
                          <td>{data.earnAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Root>
  );
};
