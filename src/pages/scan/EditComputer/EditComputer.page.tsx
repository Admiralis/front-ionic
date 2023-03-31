import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "commons/components";
import {useHistory, useLocation} from "react-router";
import {NewComputer} from "commons/models";
import {EditComputerComponent} from "./components/EditComputer.component";
import useComputers from "../../../commons/hooks/computers/useComputers";

const AddComputerFormActions = () => {
    const router = useHistory();
    const location = useLocation<{ comeFrom: string }>();
    const handleCancel = () => {
        router.push(location.state.comeFrom, {newComputerState: {} as NewComputer});
    };
    return (
        <>
            <IonButton className="red" onClick={handleCancel}>Annuler</IonButton>
            <IonButton className="green" type="submit">Valider</IonButton>
        </>
    );
}

/**
 * Page de confirmation de l'ajout d'un PC
 * Reprend les informations du formulaire '/add' et permet d'y ajouter des commentaires au PC
 */
const EditComputerPage = () => {

    const location = useLocation<{ newComputerState: NewComputer, comeFrom: string }>();
    const [newComputerInfo, setNewComputerInfo] = useState({} as NewComputer);
    const router = useHistory();
    const {addComputer} = useComputers();

    useEffect(() => {

        if (!location.state) {
            return;
        }

        if (!location.state.newComputerState?.comments) {
            setNewComputerInfo({
                ...location.state.newComputerState,
                comments: []
            });
        } else {
            setNewComputerInfo(location.state.newComputerState);
        }
    }, [location.state]);

    /**
     * Soumet le formulaire et redirige vers la page de scan
     * Passe le paramètre "reScan" à true pour ouvrir automatiquement la caméra sur Android
     * @param e
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();
        addComputer(newComputerInfo);
        router.push(location.state.comeFrom, {reScan: true});
    }

    return (
        <div>
            <IonPage>
                <IonContent>
                    <form className="flex-container" onSubmit={handleSubmit}>
                        <CardComponent
                            title="Valider un PC"
                            content={<EditComputerComponent newComputerInfo={newComputerInfo}
                                                            setNewComputerInfo={setNewComputerInfo}/>}
                            actions={<AddComputerFormActions/>}
                        />
                    </form>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default EditComputerPage;