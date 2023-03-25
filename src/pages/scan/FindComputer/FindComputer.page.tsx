import React, {useState} from 'react';
import {IonContent, IonPage} from "@ionic/react";
import {CardComponent, CodeScannerComponent} from "commons/components";


const FindComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);

    return (
        <IonPage>
            <IonContent>
                <form>
                    <CardComponent
                        title="Scannez le PC"
                        content={<p>content</p>}
                        actions={<p>actions</p>}
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

export default FindComputerPage;