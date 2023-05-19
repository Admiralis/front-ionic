import React from "react";
import useCheckApiConnection from "../../hooks/connection/useCheckApiConnection";
import {Redirect} from "react-router-dom";
import PATHS from "../../constants/PATHS";

export const withConnectionStatus = (Component: React.FC) => (props: any) => {

    const {isLoanApiConnected} = useCheckApiConnection();

    if (!isLoanApiConnected) return <Redirect to={PATHS.SETTINGS.root}/>;
    return <Component {...props}/>;

}