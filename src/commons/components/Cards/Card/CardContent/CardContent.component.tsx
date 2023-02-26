import React from "react";
import {IonCardContent} from "@ionic/react";

interface CardContentProps {
    collapsible?: boolean;
    collapsed?: boolean;
    content?: React.ReactNode;
    actions?: React.ReactNode;
}

export function CardContent(props: CardContentProps) {
    return <>
        {props.collapsible && props.collapsed
            ?
            <IonCardContent/>
            :
            <IonCardContent>
                {props.content}
                <div>
                    {props.actions}
                </div>
            </IonCardContent>}
    </>;
}