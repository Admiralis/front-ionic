import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import CodeScannerComponent from "commons/components/CodeScanner/CodeScanner.component";
import {CardComponent} from "commons/components";
import './AddComputer.component.css'
import {ComputerAddFormComponent} from "commons/components/";
import {NewComputer} from "commons/models";
import {Simulate} from "react-dom/test-utils";
import {useHistory, useLocation} from "react-router";
import {ComputerService} from "commons/services/computer";
import SimpleModalComponent from "commons/components/Modals/SimpleModal/SimpleModal.component";
import {isValidateButtonDisabled, submitOnEnter} from "commons/utils";
import useAutoRescan from "commons/hooks/scan/useAutoRescan";
import paths from "../../../commons/constants/paths";

/**
 * Page d'ajout d'un PC
 * Permet de remplir les champs du formulaire et de scanner le code-barres du PC
 */
const AddComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [newComputerInfo, setNewComputerInfo] = useState<NewComputer>({} as NewComputer);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const {autoScan} = useAutoRescan();
    const history = useHistory();
    const location = useLocation<{serialNumber: string, comeFrom: string }>();


    useEffect(() => {
        if (location.state) {
            setComputerSerial(location.state.serialNumber);
        }
    }, [location.state])

    useEffect(() => {
        setScanning(autoScan);
    }, [autoScan])

    useEffect(() => {
        // Met le numéro de série en toute majuscule
        // La double dépendance assure le bon rafraichissement des données
        computerSerial && setComputerSerial(computerSerial.toUpperCase());
    }, [computerSerial, newComputerInfo]);

    useEffect(() => {
        // Soumet automatiquement le formulaire si un code a été scanné
        if (autoSubmit) {
            Simulate.submit(document.querySelector('form') as HTMLFormElement)
            setScanning(false);
            setAutoSubmit(false)
        }
    }, [autoSubmit])

    /**
     * Vérifie si l'ordinateur existe
     * Si oui, ouvre la modale
     * Sinon, redirige vers la page de confirmation
     */
    const checkIfExistsAndSend = (): void => {
        ComputerService.computerExistsBySerial(computerSerial).then((computerExists) => {
            if (computerExists) {
                openDialogAndReset();
            } else {
                goNextStep();
            }
        });
    }

    /**
     * Ouvre la modale et reset le champ "Serial Number"
     */
    function openDialogAndReset() {
        setComputerSerial('');
        setOpen(true);
    }

    /**
     * Redirige vers la page de confirmation
     */
    function goNextStep() {
        newComputerInfo.serialNumber = computerSerial;
        history.push(paths.computers.new, {computer: newComputerInfo, comeFrom: location.pathname});
        setComputerSerial('');
    }

    /**
     * Soumet le formulaire et reset le champ "Serial Number"
     * Redirige vers la page de confirmation
     * @param e
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();
        checkIfExistsAndSend();
    }

    return (
        <IonPage>
            <IonContent onKeyDown={submitOnEnter}>
                <form className="flex-container" onSubmit={handleSubmit} onKeyDown={submitOnEnter}>
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
                            <IonButton className="green" type="submit" disabled={isValidateButtonDisabled(computerSerial, 7)}>
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
            <SimpleModalComponent isOpen={open} setIsOpen={setOpen} content={<p>Le PC existe déjà</p>} title={<p>Ooops !</p>}/>
        </IonPage>
    );
};

export default AddComputerPage;