import React from 'react';

import './ScanMenu.page.css';
import CardComponent from "../../../commons/components/Cards/Card/Card.component";
import {IonButton, IonPage} from "@ionic/react";


/**
 * Contenu de la page de menu
 */
const ScanMenuContent = () => {
    return <p>Que voulez vous faire ?</p>
}

/**
 * Actions que peut faire l'utilisateur sur la page de menu
 * @return {JSX.Element}
 */
const ScanMenuActions = () => {
    return <>
        <IonButton> Prêt individuel </IonButton>
        <IonButton> Prêt collectif </IonButton>
        <IonButton> Ajouter PC </IonButton>
        <IonButton> Retour au stock </IonButton>
        <IonButton> Editer PC </IonButton>
        <IonButton> ¯\_(ツ)_/¯ </IonButton>
    </>;
}

/**
 * Page de menu
 */
const ScanMenuPage = () => {
    return (
        <IonPage>
            <CardComponent title="Menu"  subtitle="Coucou" content={<ScanMenuContent/>} actions={<ScanMenuActions/>} />
        </IonPage>
    );
};

export default ScanMenuPage;