import { Root } from "../Root"
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import HttpService from "../../services/http";
import { toast } from "react-toastify";

const Account = () => {
    const [accountBody, setAccountBody] = useState<any>({});

    const handleSubmit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            let formData = new FormData();

            formData.append('accountNo', accountBody.accountNo);
            formData.append('ifscCode', accountBody.ifscCode);
            formData.append('upiId', accountBody.upiId);
            if (typeof (accountBody.upiQrCode) != "string") {
                formData.append('upiQrCode', accountBody.upiQrCode);
            }

            const response = await HttpService.accountUpdate(formData);
            setAccountBody(response);
            toast.success('Account updated successfully.');
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    const getTransactions = async () => {
        try {
            const data = await HttpService.getAccountInfo();
            setAccountBody(data);
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    const bodyHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let body = { ...accountBody };
        body[e.target.name] = e.target.value;
        setAccountBody(body);
    }

    const bodyImageHandler = (e: any) => {
        let body = { ...accountBody };
        body[e.target.name] = e.target.files[0];
        setAccountBody(body);
    };

    return (
        <Root>
            <div className="page-wrape">
                <div className="patient-list-area">
                    <div className="container-fluid">
                        <div className="section-header">
                            <div className="row align-items-center">
                                <div className="col-6">
                                    <div className="section-title">
                                        <h2 className="title">Account</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="primary-form">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="accountNo">Account No</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="accountNo"
                                                placeholder="Account No"
                                                value={accountBody.accountNo}
                                                onChange={bodyHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="ifscCode">IFSC Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="ifscCode"
                                                placeholder="IFSC Code"
                                                value={accountBody.ifscCode}
                                                onChange={bodyHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="upiId">UPI Id</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="upiId"
                                                placeholder="UPI Id"
                                                value={accountBody.upiId}
                                                onChange={bodyHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="upiQrCode">UPI QR-Code</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="upiQrCode"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={bodyImageHandler}
                                                max={1}
                                                min={1}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <button type="submit" className="form-btn">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Root>
    );
}

export default Account;