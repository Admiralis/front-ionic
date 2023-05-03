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
            <IonCardContent data-testid='collapsed' />
            :
            <IonCardContent data-testid='extended' >
                <div>
                    {props.content}
                </div>
                <div>
                    {props.actions}
                </div>
            </IonCardContent>}
    </>;
}