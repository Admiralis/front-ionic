import { LinuxButtonComponent } from "commons/components";
import React from "react";

interface CardButtonsProps {
    collapsible?: boolean;
    collapsed?: boolean;
}
export function CardButtonsComponent(props: CardButtonsProps) {
    return <>
        {
            props.collapsible ?
                <div>
                    {props.collapsed ?
                        <LinuxButtonComponent/> :
                        <LinuxButtonComponent color="yellow"/>}
                </div> :
                <div style={{width: "20px"}}></div>
        }
    </>;
}