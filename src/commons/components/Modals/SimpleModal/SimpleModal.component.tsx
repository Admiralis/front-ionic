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

/**
 * Composant de modal simple
 * @param props - isOpen : boolean : indique si la modal est ouverte
 * @param props - setIsOpen : (isOpen: boolean) => void : fonction de mise à jour de l'état d'ouverture de la modal
 * @param props - title : React.ReactNode : titre de la modal
 * @param props - content : React.ReactNode : contenu de la modal
 * @param props (facultatif) - actions : React.ReactNode : actions de la modal
 * @param props (facultatif) - height : string : hauteur de la modal
 * @constructor
 */
const SimpleModalComponent = (props: AlreadyExistsModalComponentProps) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const {isOpen, setIsOpen, title, content, actions, height} = props;

    function dismiss() {
        modal.current?.dismiss();
    }

    return (
        <IonModal isOpen={isOpen} className={styles.modal} style={{height: height}} showBackdrop onIonModalDidDismiss={() => setIsOpen(false)} >
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