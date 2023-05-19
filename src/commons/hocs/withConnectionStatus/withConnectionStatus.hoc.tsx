import React from "react";
import useCheckApiConnection from "../../hooks/connection/useCheckApiConnection";
import {Redirect} from "react-router-dom";
import PATHS from "../../constants/PATHS";
import useStorage from "../../hooks/storage/useStorage";

export const withConnectionStatus = (Component: React.FC) => (props: any) => {

    const {isConnected} = useCheckApiConnection();

    if (!isConnected) return <Redirect to={PATHS.SETTINGS.root}/>;

    return <Component {...props}/>;

}