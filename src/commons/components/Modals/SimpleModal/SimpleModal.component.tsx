import React, {useRef} from 'react';
import {IonModal} from "@ionic/react";
import styles from './SimpleModal.module.css';
import {LinuxButtonComponent} from "commons/components/index";

interface AlreadyExistsModalComponentProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: React.ReactNode;
    content: React.ReactNode;
    actions?: React.ReactNode;
}

const SimpleModalComponent = (props: AlreadyExistsModalComponentProps) => {
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
                {props.title}
                <span className={styles.buttonContainer} ></span>
            </div>
            <div className={styles.body}>
                {props.content}
            </div>
            <div className={styles.footer}>
                {props.actions}
            </div>
        </IonModal>
    );
};

export default SimpleModalComponent;