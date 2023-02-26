import React from 'react';
import {IonPage} from "@ionic/react";
import {CardComponent} from "commons/components";
import {ScanMenuActionsComponent} from "./ScanMenuActions/ScanMenuActions.component";
import CodeScannerComponent from "../../../commons/components/CodeScanner/CodeScanner.component";


/**
 * Contenu de la page de menu
 */
const ScanMenuContent = () => {
    return <p>Que voulez vous faire ?</p>
}

/**
 * Page de menu
 */
const ScanMenuPage = () => {
    return (
        <IonPage>
            <CardComponent title="Menu" content={<ScanMenuContent/>} actions={<ScanMenuActionsComponent/>}/>
        </IonPage>
    );
};

export default ScanMenuPage;