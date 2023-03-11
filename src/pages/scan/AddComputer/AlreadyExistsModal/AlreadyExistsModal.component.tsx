import React, {useRef} from 'react';
import {IonButton, IonContent, IonModal, IonTitle, IonToolbar} from "@ionic/react";
import styles from './AlreadyExistsModal.module.css';
import {LinuxButtonComponent} from "commons/components";

interface AlreadyExistsModalComponentProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AlreadyExistsModalComponent = (props: AlreadyExistsModalComponentProps) => {
    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        modal.current?.dismiss();
    }

    return (
        <IonModal isOpen={props.isOpen} className={styles.modal}>
            <div className={styles.header}>
                    <span className={styles.buttonContainer} >
                    <LinuxButtonComponent color="red" onClick={() => props.setIsOpen(false)}/>
                    </span>
                <p>Ooops !</p>
                <span className={styles.buttonContainer} ></span>
            </div>
            <div className={styles.body}>
                <p>Le PC existe déjà</p>
            </div>
        </IonModal>
    );
};

export default AlreadyExistsModalComponent;