import React, {useEffect} from 'react';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import './Card.module.css';
import {CardButtonsComponent} from "../components/CardButtons/CardButtons.component";
import {CardAlertComponent} from "../components/CardAlert/CardAlert.component";
import {CardContentComponent} from "../components/CardContent/CardContent.component";
import styles from "../TinyCard/TinyCard.module.css";

interface CardProps {
    title: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
    subtitle?: string;
    collapsible?: boolean;
    alert?: boolean;
    tiny?: boolean;
}

const CardComponent = (props: CardProps) => {
    const {title, subtitle, content, actions, collapsible, alert, tiny} = props;
    const [collapsed, setCollapsed] = React.useState(false);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <IonCard>
            <IonCardHeader onClick={handleCollapse} className={tiny ? styles.header : ''}>
                <CardButtonsComponent collapsible={collapsible} collapsed={collapsed} small={tiny} />
                <div>
                    <IonCardTitle className={tiny ? styles.title : ''}>{title}</IonCardTitle>
                    <IonCardSubtitle>{subtitle}</IonCardSubtitle>
                </div>
                <CardAlertComponent alert={alert} small={tiny}/>
            </IonCardHeader>
            <CardContentComponent
                collapsible={collapsible}
                 collapsed={collapsed}
                 content={content || <></>}
                 actions={actions}
            />
        </IonCard>
    );
};

export default CardComponent;