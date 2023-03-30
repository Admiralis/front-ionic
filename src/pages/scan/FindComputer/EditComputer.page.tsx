import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent, CodeScannerComponent} from "commons/components";
import useComputer from "../../../commons/hooks/computers/useComputer";


const EditComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);


    const {computer, isLoading, error} = useComputer(computerSerial);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        computer ? console.log(computer) : console.log(error);
    };

    return (
        <IonPage>
            <IonContent>
                <form onSubmit={handleSubmit}>
                    <CardComponent
                        title="Scannez le PC"
                        content={
                            <AsciiInputComponent
                                value={computerSerial}
                                label="SerialNumber"
                                onIonChange={e => {
                                    setComputerSerial(e.detail.value!)
                                }}
                            />
                        }
                        actions={<IonButton className="green" type="submit">Valider</IonButton>}
                    />
                </form>
                <CodeScannerComponent
                    setComputerSerial={setComputerSerial}
                    scanning={scanning}
                    setScanning={setScanning}
                    setAutoSubmit={setAutoSubmit}
                />
            </IonContent>
        </IonPage>
    );
};

export default EditComputerPage;