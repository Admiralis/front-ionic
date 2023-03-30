import React, {useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent, CodeScannerComponent} from "commons/components";


const EditComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);

    return (
        <IonPage>
            <IonContent>
                <form>
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

interface FindComputerBySerialComponentProps {
    computerSerial: string;
    setComputerSerial: (computerSerial: string) => void;

}

const FindComputerBySerialComponent = (props: FindComputerBySerialComponentProps) => {
    const {computerSerial, setComputerSerial} = props;
    return (
        <AsciiInputComponent
            value={computerSerial}
            label="SerialNumber"
            onIonChange={e => {
                setComputerSerial(e.detail.value!)
            }}
        />
    );
};