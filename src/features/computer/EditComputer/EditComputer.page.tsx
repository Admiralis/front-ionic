import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage, IonToast} from "@ionic/react";
import {CardComponent} from "commons/components";
import {useHistory, useLocation} from "react-router";
import {NewComputer} from "commons/models";
import {EditComputerComponent} from "./components/EditComputer.component";
import useComputers from "commons/hooks/computers/useComputers";
import {Computer, Course} from "../../../commons/models";
import PATHS from "../../../commons/constants/PATHS";
import {ComputerService} from "../../../commons/services/computer";

/**
 * Page de confirmation de l'ajout d'un PC
 * Reprend les informations du formulaire '/add' et permet d'y ajouter des commentaires au PC
 */
const EditComputerPage = () => {

    const location = useLocation<{ computer: Computer, comeFrom: string, course: Course }>();
    const [computer, setComputer] = useState({} as Computer);
    const [origin, setOrigin] = useState<string>('');
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastColor, setToastColor] = React.useState('success')


    const router = useHistory();
    const {addComputer} = useComputers();

    useEffect(() => {

        if (!location.state) {
            return;
        }

        if (!location.state.computer?.comments) {
            setComputer({
                ...location.state.computer,
                comments: []
            });
        } else {
            setComputer(location.state.computer);
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
            if (location.pathname === PATHS.COMPUTERS.new) {
                await addComputer(computer);
                setToastMessage(`Le PC ${computer.serialNumber} a bien été ajouté !`);
                setToastColor('success')
                setIsToastOpen(true);
            }
            if (location.pathname === PATHS.COMPUTERS.edit + computer.serialNumber) {
                await ComputerService.updateComputer(computer);
                setToastMessage(`Le PC ${computer.serialNumber} a bien été modifié !`);
                setToastColor('success')
                setIsToastOpen(true);
            }
            router.push(origin, {reScan: true});
        } catch (e) {
            console.error(e);
            setToastMessage(`Une erreur est survenue ! Vérifiez la connection API et réessayez.`);
            setToastColor('danger')
            setIsToastOpen(true);
        }
    }

    const handleCancel = () => {
        router.push(origin, {computer: {} as Computer});
    };

    return (
        <div>
            <IonPage>
                <IonContent>
                    <form className="flex-container" onSubmit={handleSubmit}>
                        <CardComponent
                            title={location.pathname === '/computers/' + computer.serialNumber ? 'Modifier un PC' : 'Ajouter un PC'}
                            content={<EditComputerComponent computer={computer}
                                                            setComputer={setComputer}/>}
                        />
                        <div className="sticky">
                            <IonButton className="red" onClick={handleCancel}>Annuler</IonButton>
                            <IonButton className="green" type="submit">Valider</IonButton>
                        </div>
                    </form>
                    <IonToast
                        isOpen={isToastOpen}
                        message={toastMessage}
                        duration={3000}
                        onDidDismiss={() => setIsToastOpen(false)}
                        color={toastColor}
                        position="top"
                    />


                </IonContent>
            </IonPage>
        </div>
    );
};

export default EditComputerPage;