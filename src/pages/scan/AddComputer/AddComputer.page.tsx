import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import CodeScannerComponent from "../../../commons/components/CodeScanner/CodeScanner.component";
import {CardComponent} from "../../../commons/components";
import './AddComputer.component.css'
import {ComputerAddFormComponent} from "commons/components/";
import {NewComputer} from "commons/models";
import {Simulate} from "react-dom/test-utils";
import {useHistory} from "react-router";

const AddComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [newComputerInfo, setNewComputerInfo] = useState<NewComputer>({} as NewComputer);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);

    const handleAddComputer = (serialNumber: string) => {
        setComputerSerial(serialNumber)
        //TODO: Submit form
    }

    useEffect(() => {
        if (!newComputerInfo) {
            setNewComputerInfo({} as NewComputer)
        } else {
            setNewComputerInfo(newComputerInfo)
        }
    }, [])

    useEffect(() => {
    }, [computerSerial, newComputerInfo])

    useEffect(() => {
        if (autoSubmit) {
            Simulate.submit(document.querySelector('form') as HTMLFormElement)
            setAutoSubmit(false)
        }
    }, [autoSubmit])

    const history = useHistory();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        newComputerInfo.serial = computerSerial;
        setComputerSerial('')
        history.push('/scan/add/confirm', {newComputerInfo: newComputerInfo});
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

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
                        setComputerSerial={handleAddComputer}
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