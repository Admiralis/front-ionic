import React from "react";
import useCheckApiConnection from "../../hooks/connection/useCheckApiConnection";
import {Redirect} from "react-router-dom";
import PATHS from "../../constants/PATHS";
import useStorage from "../../hooks/storage/useStorage";
import {useHistory} from "react-router";

export const withConnectionStatus = (Component: React.FC) => (props: any) => {

    useCheckApiConnection();

    return <Component {...props}/>;

}