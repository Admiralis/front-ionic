import React from 'react';
import {IonButton, IonPage} from "@ionic/react";
import {CardComponent} from "commons/components";



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
        <IonButton className="green medium"> Prêt individuel </IonButton>
        <IonButton className="green medium"> Prêt collectif </IonButton>
        <IonButton className="green medium"> Ajouter PC </IonButton>
        <IonButton className="green medium"> Retour au stock </IonButton>
        <IonButton className="green medium"> Editer PC </IonButton>
        <IonButton className="green medium"> ¯\_(ツ)_/¯ </IonButton>
    </>;
}

/**
 * Page de menu
 */
const ScanMenuPage = () => {
    return (
        <IonPage>
            <CardComponent title="Menu" content={<ScanMenuContent/>} actions={<ScanMenuActions/>} />
        </IonPage>
    );
};

export default ScanMenuPage;