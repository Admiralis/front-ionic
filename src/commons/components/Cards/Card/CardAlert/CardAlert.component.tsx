import { AlertIconComponent } from "commons/components";
import React from "react";

interface CardAlertProps {
    alert?: boolean;
}

export function CardAlertComponent(props: CardAlertProps) {
    return <>
        {props.alert ?
            <div><AlertIconComponent/></div> :
            <div style={{width: "20px"}}></div>
        }
    </>;
}