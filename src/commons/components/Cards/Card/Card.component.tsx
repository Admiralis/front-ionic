import React, {useEffect} from 'react';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import './Card.component.css';
import {CardButtonsComponent} from "./CardButtons/CardButtons.component";
import {CardAlertComponent} from "./CardAlert/CardAlert.component";
import {CardContentComponent} from "./CardContent/CardContent.component";

interface CardProps {
    title: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
    subtitle?: string;
    collapsible?: boolean;
    alert?: boolean;
}

const CardComponent = (props: CardProps) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <IonCard>
            <IonCardHeader onClick={handleCollapse}>
                <CardButtonsComponent collapsible={props.collapsible} collapsed={collapsed}/>
                <div>
                    <IonCardTitle>{props.title}</IonCardTitle>
                    <IonCardSubtitle>{props.subtitle}</IonCardSubtitle>
                </div>
                <CardAlertComponent alert={props.alert}/>
            </IonCardHeader>
            <CardContentComponent
                collapsible={props.collapsible}
                 collapsed={collapsed}
                 content={props.content || <></>}
                 actions={props.actions}
            />
        </IonCard>
    );
};

export default CardComponent;