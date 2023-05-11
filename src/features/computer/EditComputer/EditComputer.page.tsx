import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "commons/components";
import {useHistory, useLocation} from "react-router";
import {NewComputer} from "commons/models";
import {EditComputerComponent} from "./components/EditComputer.component";
import useComputers from "commons/hooks/computers/useComputers";
import {Course} from "../../../commons/models";
import PATHS from "../../../commons/constants/PATHS";
import {ComputerService} from "../../../commons/services/computer";

interface AddComputerFormConfirmComponentProps {
    origin: string;
}
const AddComputerFormActions = (props: AddComputerFormConfirmComponentProps) => {

    const {origin} = props;

    const router = useHistory();
    const handleCancel = () => {
        router.push(origin, {computer: {} as NewComputer});
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

    const location = useLocation<{ computer: NewComputer, comeFrom: string, course: Course }>();
    const [newComputerInfo, setNewComputerInfo] = useState({} as NewComputer);
    const [origin, setOrigin] = useState<string>('');
    const router = useHistory();
    const {addComputer} = useComputers();

    useEffect(() => {

        if (!location.state) {
            return;
        }

        if (!location.state.computer?.comments) {
            setNewComputerInfo({
                ...location.state.computer,
                comments: []
            });
        } else {
            setNewComputerInfo(location.state.computer);
        }

        if (location.state.comeFrom) {
            setOrigin(location.state.comeFrom);
        } else {
            setOrigin('');
        }

    }, [location.state]);

    /**
     * Soumet le formulaire et redirige vers la page de scan
     * Passe le paramètre "reScan" à true pour ouvrir automatiquement la caméra sur Android
     * @param e
     */
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            location.pathname === PATHS.COMPUTERS.new &&  await addComputer(newComputerInfo);
            location.pathname === PATHS.COMPUTERS.edit + newComputerInfo.serialNumber &&  await ComputerService.updateComputer(newComputerInfo);
            router.push(origin , {reScan: true});
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <IonPage>
                <IonContent>
                    <form className="flex-container" onSubmit={handleSubmit}>
                        <CardComponent
                            title={location.pathname === '/computers/' + newComputerInfo.serialNumber ? 'Modifier un PC' : 'Ajouter un PC'}
                            content={<EditComputerComponent newComputerInfo={newComputerInfo}
                                                            setNewComputerInfo={setNewComputerInfo}/>}
                            actions={<AddComputerFormActions origin={origin} />}
                        />
                    </form>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default EditComputerPage;