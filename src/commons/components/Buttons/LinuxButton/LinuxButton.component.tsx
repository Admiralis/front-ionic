import React, {useEffect} from 'react';
import styles from "./LinuxButton.module.css";

interface LinuxButtonProps {
    color?: "red" | "yellow"

    hidden?: boolean

    small?: boolean

    onClick?: () => void
}

/**
 * Bouton avec un style 'Linux'
 * @param props.color Couleur du bouton. Peut être "red", "yellow" ou "green". Par défaut, sera "green"
 * @param props.hidden Si le bouton doit être caché ou non. Par défaut, sera "false"
 * @param props.onClick Fonction à exécuter lors du clic sur le bouton
 * @constructor
 */
const LinuxButtonComponent = (props: LinuxButtonProps) => {

    /**
     * Définit la couleur en fonction des props.
     * Si aucun props "Color" n'est reçu, sera vert.
     */
    const setColor = () => {
        if (props.color === 'red') {
            return "#EB4B4D"
        } else if (props.color === 'yellow') {
            return "#FFBD4C"
        } else {
            return "#00CA56"
        }
    }

    /**
     * Définit la taille de l'élément en fonction des props.
     * Si aucune taille n'est reçue, sera de 20px
     */
    const setSize = () => {
        if (props.small) {
            return "15"
        } else {
            return "20"
        }
    }

    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        props.onClick && props.onClick()
    }

    return (
        <button hidden={props.hidden} onClick={handleClick} className={styles.buttonContainer}>
            <svg width={setSize()} height={setSize()} viewBox="0 0 20 20" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill={setColor()}/>
            </svg>
        </button>
    );
};

export default LinuxButtonComponent;