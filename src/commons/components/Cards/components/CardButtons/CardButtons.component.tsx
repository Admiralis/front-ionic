import { LinuxButtonComponent } from "commons/components/index";
import React from "react";

interface CardButtonsProps {
    collapsible?: boolean;
    collapsed?: boolean;

    small?: boolean;
}
export function CardButtonsComponent(props: CardButtonsProps) {
    return <>
        {
            props.collapsible ?
                <div data-testid='collapsible' >
                    {props.collapsed ?
                        <LinuxButtonComponent small={props.small}/> :
                        <LinuxButtonComponent color="yellow" small={props.small}/>}
                </div> :
                <div style={{width: "20px"}} data-testid='no-collapsible' ></div>
        }
    </>;
}