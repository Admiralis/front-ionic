import { AlertIconComponent } from "commons/components/index";
import React from "react";

interface CardAlertProps {
    alert?: boolean;
    small?: boolean;
}

export function CardAlertComponent(props: CardAlertProps) {
    const {small, alert} = props;

    return <>
        {alert ?
            <div><AlertIconComponent size={small ? 15 : 20}/></div> :
            <div style={{width: "20px"}}></div>
        }
    </>;
}