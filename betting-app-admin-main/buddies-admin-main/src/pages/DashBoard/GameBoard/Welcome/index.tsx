import { useEffect, useState } from 'react';
import totalAmountSvg from "../../../../assets/images/icons/totalAmount.svg";
import totalEarningSvg from "../../../../assets/images/icons/totalEarning.svg";
import openPricesSvg from "../../../../assets/images/icons/openPrices.svg";
import personSvg from "../../../../assets/images/icons/person.svg";
import HttpService from '../../../../services/http';

export const Welcome = ({ period }: any) => {
    const [data, setData] = useState<any>(null);

    const dashboardSetHandler = async () => {
        const dashboardData: any = await HttpService.getDashboardData();
        setData(dashboardData);
    }

    useEffect(() => {
        dashboardSetHandler();
    }, [period]);

    return (
        <div className="container-fluid">
            <div className="section-header">
                <div className="section-title">
                    <h2 className="title">Welcome</h2>
                </div>
            </div>
            <div className="row ">
                <div className="single-welcome col-lg">
                    <div className="media align-items-center">
                        <div className="welcome-icon bg-one">
                            <img
                                src={totalAmountSvg}
                                alt="Total Amount"
                            />
                        </div>
                        <div className="media-body">
                            <p className="m-0">Total Bet Amount</p>
                            <h3 className="counter">{data ? Number(data.totalBetAmount).toFixed(2) : 0}</h3>
                        </div>
                    </div>
                </div>
                <div className="single-welcome col-lg">
                    <div className="media align-items-center">
                        <div className="welcome-icon bg-two">
                            <img
                                src={totalEarningSvg}
                                alt="Total Earning"
                            />
                        </div>
                        <div className="media-body">
                            <p className="m-0">Total Earning</p>
                            <h3 className="counter">{data ? Number(data.totalEarning).toFixed(2) : 0}</h3>
                        </div>
                    </div>
                </div>
                <div className="single-welcome col-lg">
                    <div className="media align-items-center">
                        <div className="welcome-icon bg-three">
                            <img
                                src={openPricesSvg}
                                alt="Open Prices"
                            />
                        </div>
                        <div className="media-body">
                            <p className="m-0">Open Prices</p>
                            <h3 className="counter">{data ? Number(data.totalPrize).toFixed(2) : 0}</h3>
                        </div>
                    </div>
                </div>
                <div className="single-welcome col-lg">
                    <div className="media align-items-center">
                        <div className="welcome-icon bg-four">
                            <img
                                src={personSvg}
                                alt="Total Users"
                            />
                        </div>
                        <div className="media-body">
                            <p className="m-0">Total User</p>
                            <h3 className="counter">{data ? data.totalUser : 0}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
