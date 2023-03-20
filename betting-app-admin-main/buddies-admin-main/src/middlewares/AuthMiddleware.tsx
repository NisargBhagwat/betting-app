import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
    children: ReactNode
}

export const AuthMiddleware = ({ children }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem("jwt") && location.pathname == "/signIn") {
            navigate("/");
        }
        else if (!localStorage.getItem("jwt")) {
            navigate("/signIn");
        }
    }, []);

    return (
        <>
            {children}
        </>
    )
}
