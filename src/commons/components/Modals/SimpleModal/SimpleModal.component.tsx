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
    height?: string;
}

const SimpleModalComponent = (props: AlreadyExistsModalComponentProps) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const {isOpen, setIsOpen, title, content, actions, height} = props;

    function dismiss() {
        modal.current?.dismiss();
    }

    return (
        <IonModal isOpen={isOpen} className={styles.modal} style={{height: height}} showBackdrop onBlur={() => setIsOpen(false)} >
            <div className={styles.header}>
                    <span className={styles.buttonContainer} >
                    <LinuxButtonComponent color="red" onClick={() => setIsOpen(false)}/>
                    </span>
                {title}
                <span className={styles.buttonContainer} ></span>
            </div>
            <div className={styles.body}>
                {content}
            </div>
            <div className={styles.footer}>
                {actions}
            </div>
        </IonModal>
    );
};

export default SimpleModalComponent;