import AlertIconComponent from "../../../Icons/AlertIcon/AlertIcon.component";
import React from "react";

interface CardAlertProps {
    alert?: boolean;
}

export function CardAlert(props: CardAlertProps) {
    return <>
        {props.alert ?
            <div><AlertIconComponent/></div> :
            <div style={{width: "20px"}}></div>
        }
    </>;
}