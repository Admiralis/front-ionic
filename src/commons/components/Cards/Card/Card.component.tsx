import React from 'react';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import './Card.module.css';
import {CardButtonsComponent} from "../components/CardButtons/CardButtons.component";
import {CardAlertComponent} from "../components/CardAlert/CardAlert.component";
import {CardContentComponent} from "../components/CardContent/CardContent.component";
import styles from "./TinyCard.module.css";

interface CardProps {
    title: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
    subtitle?: string;
    collapsible?: boolean;
    alert?: boolean;
    tiny?: boolean;
}

/**
 * Composant carte, utilisé pour afficher des informations
 * @param props.title Titre de la carte
 * @param props?.subtitle Sous-titre de la carte
 * @param props?.content Contenu de la carte (composant React)
 * @param props?.actions Partie basse de la carte. Utilisé pour les boutons (composant React)
 * @param props?.collapsible Si la carte doit être repliable. False par défaut
 * @param props?.alert Si la carte doit afficher une alerte. False par défaut
 * @param props?.tiny Version petite de la carte. False par défaut
 * @constructor
 */
export default function CardComponent  (props: CardProps) {
    const {title, subtitle, content, actions, collapsible, alert, tiny} = props;
    const [collapsed, setCollapsed] = React.useState(false);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <IonCard>
            <IonCardHeader onClick={handleCollapse} className={tiny ? styles.header : ''} data-testid="header" >
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