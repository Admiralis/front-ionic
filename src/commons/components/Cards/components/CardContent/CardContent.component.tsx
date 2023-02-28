import React from "react";
import {IonCardContent} from "@ionic/react";

interface CardContentProps {
    collapsible?: boolean;
    collapsed?: boolean;
    content?: React.ReactNode;
    actions?: React.ReactNode;
}

export function CardContentComponent(props: CardContentProps) {
    return <>
        {props.collapsible && props.collapsed
            ?
            <IonCardContent/>
            :
            <IonCardContent>
                {props.content}
                {props.actions}
            </IonCardContent>}
    </>;
}