import React from 'react';

import './ScanMenu.page.css';
import CardComponent from "../../../commons/components/Cards/Card/Card.component";
import {IonButton, IonContent, IonPage} from "@ionic/react";


const ScanMenuPage = () => {
    return (
        <IonPage>
            <IonContent>
                <CardComponent title="Menu" content="Que voulez vous faire ?">
                    <IonButton> Prêt individuel </IonButton>
                    <IonButton> Prêt collectif </IonButton>
                    <IonButton> Ajouter PC </IonButton>
                    <IonButton> Retour au stock </IonButton>
                    <IonButton> Editer PC </IonButton>
                    <IonButton> ¯\_(ツ)_/¯ </IonButton>
                </CardComponent>
            </IonContent>
        </IonPage>
    );
};

export default ScanMenuPage;