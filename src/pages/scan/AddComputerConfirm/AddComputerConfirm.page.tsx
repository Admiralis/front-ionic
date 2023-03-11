import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "commons/components";
import {useHistory, useLocation} from "react-router";
import {NewComputer} from "commons/models";
import {AddComputerFormConfirmComponent} from "./AddComputerFormConfirm/AddComputerFormConfirm.component";
import {ComputerService} from "commons/services/computer";

const AddComputerFormActions = () => {
    const router = useHistory();
    const handleCancel = () => {
        router.push('/scan/add', {newComputerInfo: {}});
    };
    return (
        <>
            <IonButton className="red" onClick={handleCancel}>Annuler</IonButton>
            <IonButton className="green" type="submit">Valider</IonButton>
        </>
    );
}

const AddComputerConfirmPage = () => {

    const location = useLocation<{ newComputerInfo: NewComputer }>();
    const [newComputerInfo, setNewComputerInfo] = useState(location.state.newComputerInfo as NewComputer);
    const router = useHistory();

    useEffect(() => {
        setNewComputerInfo({
            ...location.state.newComputerInfo,
            comments: []
        });
    }, [location.state.newComputerInfo]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        ComputerService.findOrCreateComputerBySerial(newComputerInfo).then(() => {
            router.push('/scan/add', {newComputerInfo: {}});
        });
    }

    return (
        <div>
            <IonPage>
                <IonContent>
                    <form className="flex-container" onSubmit={handleSubmit}>
                        <CardComponent
                            title="Valider un PC"
                            content={<AddComputerFormConfirmComponent newComputerInfo={newComputerInfo}
                                                                      setNewComputerInfo={setNewComputerInfo}/>}
                            actions={<AddComputerFormActions/>}
                        />
                    </form>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default AddComputerConfirmPage;