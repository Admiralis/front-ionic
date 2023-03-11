import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage, isPlatform} from "@ionic/react";
import CodeScannerComponent from "../../../commons/components/CodeScanner/CodeScanner.component";
import {CardComponent} from "../../../commons/components";
import './AddComputer.component.css'
import {ComputerAddFormComponent} from "commons/components/";
import {NewComputer} from "commons/models";
import {Simulate} from "react-dom/test-utils";
import {useHistory, useLocation} from "react-router";

const AddComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [newComputerInfo, setNewComputerInfo] = useState<NewComputer>({} as NewComputer);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);

    const location = useLocation<{ reScan: boolean }>();
    const history = useHistory();

    useEffect(() => {

    }, [computerSerial, newComputerInfo]);

    useEffect(() => {
        // Ouvre automatiquement la caméra si on vient de la page de confirmation
        if (isPlatform('android') && location.state.reScan) {
            setScanning(true);
        }
    }, [location.state]);

    useEffect(() => {
        // Soumet automatiquement le formulaire si un code a été scanné
        if (autoSubmit) {
            Simulate.submit(document.querySelector('form') as HTMLFormElement)
            setScanning(false)
            setAutoSubmit(false)
        }
    }, [autoSubmit])

    /**
     * Soumet le formulaire et reset le champ "Serial Number"
     * Redirige vers la page de confirmation
     * @param e
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();
        newComputerInfo.serial = computerSerial;
        setComputerSerial('')
        history.push('/scan/add/confirm', {newComputerInfo: newComputerInfo});
    }

    /**
     * Soumet le formulaire si la touche "Entrée" est pressée
     * @param e
     */
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    /**
     * Est à true si le numéro de série est plus petit que 7 caractères
     */
    const isValidateButtonDisabled = () => {
        return computerSerial.length < 7;
    }

    return (
        <IonPage>
            <IonContent onKeyDown={handleKeyDown}>
                <form className="flex-container" onSubmit={handleSubmit}>
                    <CardComponent
                        title={"Ajouter un PC"}
                        content={
                            <ComputerAddFormComponent
                                computerSerial={computerSerial}
                                setComputerSerial={setComputerSerial}
                                newComputerInfo={newComputerInfo}
                                setNewComputerInfo={setNewComputerInfo}
                            />
                        }
                        actions={
                            <IonButton className="green" type="submit" disabled={isValidateButtonDisabled()}>
                                Ajouter PC
                            </IonButton>
                        }
                    />
                    <span className="scan-button">

                    <CodeScannerComponent
                        setComputerSerial={setComputerSerial}
                        scanning={scanning}
                        setScanning={setScanning}
                        setAutoSubmit={setAutoSubmit}
                    />
                    </span>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddComputerPage;