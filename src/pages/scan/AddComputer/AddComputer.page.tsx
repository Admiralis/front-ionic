import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import CodeScannerComponent from "../../../commons/components/CodeScanner/CodeScanner.component";
import {CardComponent} from "../../../commons/components";
import './AddComputer.component.css'
import {ComputerAddFormComponent} from "../../../commons/components/Forms/ComputerAddForm/ComputerAddFormComponent";
import TinyCardComponent from "../../../commons/components/Cards/TinyCard/TinyCard.component";

const AddComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);

    const handleAddComputer = (serialNumber: string) => {
        setComputerSerial(serialNumber)
        //TODO: Submit form
    }

    useEffect(() => {
    }, [computerSerial])

    return (
        <IonPage>
            <IonContent>
                <div className="flex-container">
                    <CardComponent
                        title={"Ajouter un PC"}
                        content={
                            <ComputerAddFormComponent
                                computerSerial={computerSerial}
                                setComputerSerial={setComputerSerial}
                            />
                        }
                        actions={<IonButton className="green">Ajouter PC</IonButton>}
                    />
                    <span className="scan-button">

                    <CodeScannerComponent setComputerSerial={handleAddComputer} scanning={scanning}
                                          setScanning={setScanning}/>
                    </span>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AddComputerPage;