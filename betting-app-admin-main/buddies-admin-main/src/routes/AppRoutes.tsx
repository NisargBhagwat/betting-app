import { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import { DashBoard } from '../pages/DashBoard';
import { SignIn } from '../pages/SignIn';
import { Histroy } from "../pages/History";
import { User } from "../pages/User";
import { Query } from "../pages/Query";
import Account from "../pages/Account";
import HttpService from "../services/http";

function AppRoutes() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [authCompleted, setAuthCompleted] = useState<boolean>(false);
    const location = useLocation()

    const auth = async () => {
        try {
            if (localStorage.getItem("jwt")) {
                await HttpService.me();
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        }
        catch (error) {
            setIsAuth(false);
        }
        setAuthCompleted(true);
    }

    useEffect(() => {
        auth();
    }, [location]);

    return (
        <>
            {
                !authCompleted && <div className="loader" />
            }
            {
                authCompleted &&
                <Routes>
                    <Route path="/" element={isAuth ? <DashBoard /> : <Navigate to={"/signIn"} />} />
                    <Route path="/signIn" element={isAuth ? <Navigate to={"/"} /> : <SignIn />} />
                    <Route path="/history" element={isAuth ? <Histroy /> : <Navigate to={"/signIn"} />} />
                    <Route path="/users" element={isAuth ? <User /> : <Navigate to={"/signIn"} />} />
                    <Route path="/query" element={isAuth ? <Query /> : <Navigate to={"/signIn"} />} />
                    <Route path="/account" element={isAuth ? <Account /> : <Navigate to={"/signIn"} />} />
                </Routes>
            }

        </>
    );
}

export default AppRoutes