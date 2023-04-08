import SimpleModalComponent from "../SimpleModal/SimpleModal.component";
import {IonButton} from "@ionic/react";
import React from "react";

interface UnknownComputerModalComponentProps {
    open: boolean,
    setIsOpen: (isOpen: boolean) => void,
    onComputerAdd: () => void,
    onCancel: () => void
}

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