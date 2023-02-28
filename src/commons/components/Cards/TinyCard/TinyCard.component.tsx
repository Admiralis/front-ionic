import React from 'react';
import {IonCard, IonCardHeader, IonCardTitle} from "@ionic/react";
import {CardButtonsComponent} from "../components/CardButtons/CardButtons.component";
import {CardAlertComponent} from "../components/CardAlert/CardAlert.component";
import {CardContentComponent} from "../components/CardContent/CardContent.component";
import styles from './TinyCard.module.css'


interface TinyCardProps {
    title: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
    collapsible?: boolean;
    alert?: boolean;
}

const TinyCardComponent = (props: TinyCardProps) => {
    const {title, content, actions, collapsible, alert} = props;
    const [collapsed, setCollapsed] = React.useState(true);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    }
    return (
        <IonCard className={styles.card}>
            <IonCardHeader onClick={handleCollapse} className={styles.header}>
                <CardButtonsComponent collapsible={collapsible} collapsed={collapsed} small/>
                <IonCardTitle className={styles.title}>{title}</IonCardTitle>
                <CardAlertComponent alert={alert} small/>
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

export default TinyCardComponent;