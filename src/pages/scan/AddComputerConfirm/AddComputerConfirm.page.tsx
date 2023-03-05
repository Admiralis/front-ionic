import React, {useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "commons/components";
import {useLocation} from "react-router";
import {NewComputer} from "commons/models";
import {AddComputerFormConfirmComponent} from "./AddComputerFormConfirm/AddComputerFormConfirm.component";

const AddComputerFormActions = () => {
    return (
        <>
            <IonButton className="red" type="submit">Annuler</IonButton>
            <IonButton className="green" type="submit">Valider</IonButton>
        </>
    );
}

const AddComputerConfirmPage = () => {

    const location = useLocation<{ newComputerInfo: NewComputer }>();

    const [computerSerial, setComputerSerial] = useState(location.state.newComputerInfo.serial as string);
    const [newComputerInfo, setNewComputerInfo] = useState(location.state.newComputerInfo as NewComputer);

    return (
        <div>
            <IonPage>
                <IonContent>
                    <div className="flex-container">
                        <CardComponent
                            title="Valider un PC"
                            content={<AddComputerFormConfirmComponent newComputerInfo={newComputerInfo} setNewComputerInfo={setNewComputerInfo} /> }
                            actions={<AddComputerFormActions />}
                        />
                    </div>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default AddComputerConfirmPage;