import React, {useEffect, useState} from 'react';
import {IonButton, IonPage} from "@ionic/react";
import CodeScannerComponent from "../../../commons/components/CodeScanner/CodeScanner.component";
import {CardComponent} from "../../../commons/components";
import './AddComputer.component.css'
import {ComputerAddFormComponent} from "../../../commons/components/Forms/ComputerAddForm/ComputerAddFormComponent";

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
        <IonPage className="scanPage">
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
            <CodeScannerComponent setComputerSerial={handleAddComputer} scanning={scanning} setScanning={setScanning}/>
        </IonPage>
    );
};

export default AddComputerPage;