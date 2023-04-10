import SimpleModalComponent from "../SimpleModal/SimpleModal.component";
import {IonButton} from "@ionic/react";
import React from "react";

interface UnknownComputerModalComponentProps {
    open: boolean,
    setIsOpen: (isOpen: boolean) => void,
    onComputerAdd: () => void,
    onCancel: () => void
}

/**
 * Modale qui affiche un message d'erreur si le PC n'existe pas
 * @param props - open : boolean : indique si la modal est ouverte
 * @param props - setIsOpen : (isOpen: boolean) => void : fonction de mise à jour de l'état d'ouverture de la modal
 * @param props - onComputerAdd : () => void : fonction de création du PC
 * @param props - onCancel : () => void : fonction d'annulation de la création du PC
 * @constructor
 */
const UnknownComputerModalComponent = (props: UnknownComputerModalComponentProps) => {
    const {open, setIsOpen, onComputerAdd, onCancel} = props;

    return <SimpleModalComponent
        isOpen={open}
        setIsOpen={setIsOpen}
        content={<p>Ce PC n'existe pas !</p>}
        title={<p>¯\_(ツ)_/¯</p>}
        actions={
            <>
                <IonButton
                    onClick={
                        onComputerAdd
                    }
                    className="green"
                >
                    Ajouter
                </IonButton>
                <IonButton
                    onClick={
                        onCancel
                    }
                    className="yellow"
                >
                    Igonrer
                </IonButton>
            </>

        }
    />;
}

export default UnknownComputerModalComponent;