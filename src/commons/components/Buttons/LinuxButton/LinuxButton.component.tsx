import React, {useEffect} from 'react';

interface LinuxButtonProps {
    color?: "red" | "yellow"
    size?: "small"

    hidden?: boolean
}

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
        if (props.size === "small") {
            return "10"
        } else {
            return "20"
        }
    }

    return (
        <span hidden={props.hidden}>
            <svg width={setSize()} height={setSize()} viewBox="0 0 20 20" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill={setColor()}/>
            </svg>
        </span>
    );
};

export default LinuxButtonComponent;