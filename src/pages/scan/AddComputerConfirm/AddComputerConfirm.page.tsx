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
    const [newComputerInfo, setNewComputerInfo] = useState(location.state.newComputerInfo as NewComputer);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setNewComputerInfo({
            ...newComputerInfo
        } as NewComputer)
        console.log(newComputerInfo)
    }

    return (
        <div>
            <IonPage>
                <IonContent>
                    <form className="flex-container" onSubmit={handleSubmit}>
                        <CardComponent
                            title="Valider un PC"
                            content={<AddComputerFormConfirmComponent newComputerInfo={newComputerInfo} setNewComputerInfo={setNewComputerInfo} /> }
                            actions={<AddComputerFormActions />}
                        />
                    </form>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default AddComputerConfirmPage;