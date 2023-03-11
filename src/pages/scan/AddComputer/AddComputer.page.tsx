import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage, isPlatform} from "@ionic/react";
import CodeScannerComponent from "../../../commons/components/CodeScanner/CodeScanner.component";
import {CardComponent} from "../../../commons/components";
import './AddComputer.component.css'
import {ComputerAddFormComponent} from "commons/components/";
import {NewComputer} from "commons/models";
import {Simulate} from "react-dom/test-utils";
import {useHistory, useLocation} from "react-router";
import {ComputerService} from "../../../commons/services/computer";

/**
 * Page d'ajout d'un PC
 * Permet de remplir les champs du formulaire et de scanner le code-barres du PC
 */
const AddComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [newComputerInfo, setNewComputerInfo] = useState<NewComputer>({} as NewComputer);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
    const [isComputerExisting, setIsComputerExisting] = useState<boolean>(false);

    const location = useLocation<{ reScan: boolean }>();
    const history = useHistory();

    useEffect(() => {
        // Met le numéro de série en toute majuscule
        // La double dépendance assure le bon rafraichissement des données
        setComputerSerial(computerSerial.toUpperCase());
    }, [computerSerial, newComputerInfo]);

    useEffect(() => {
        location.state = {reScan: false};
    }, [])

    useEffect(() => {
        // Prévient les erreur lors des changements de page
        if (!location.state) {
            return;
        }
        // Ouvre automatiquement la caméra si on vient de la page de confirmation
        if (isPlatform('android') && location.state.reScan) {
            setScanning(true);
        }
    }, [location.state]);

    useEffect(() => {
        // Soumet automatiquement le formulaire si un code a été scanné
        if (autoSubmit) {
            Simulate.submit(document.querySelector('form') as HTMLFormElement)
            setScanning(false);
            setAutoSubmit(false)
        }
    }, [autoSubmit])

    /**
     * Retourne true si le PC existe déjà dans le BDD
     */
    const computerExists = (): void => {
        ComputerService.computerExistsBySerial(computerSerial).then((computerExists) => {
            if (computerExists) {
                setIsComputerExisting(true);
            }
        });
    }

    /**
     * Soumet le formulaire et reset le champ "Serial Number"
     * Redirige vers la page de confirmation
     * @param e
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setComputerSerial('');
        newComputerInfo.serial = computerSerial;
        computerExists();
        if (isComputerExisting) {
            alert('Ce PC existe déjà dans la base de données');
            setIsComputerExisting(false);
        } else {
            history.push('/scan/add/confirm', {newComputerState: newComputerInfo});
        }
    }

    /**
     * Soumet le formulaire si la touche "Entrée" est pressée
     * @param e
     */
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !isValidateButtonDisabled()) {
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