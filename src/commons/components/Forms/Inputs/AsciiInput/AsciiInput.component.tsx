 import {IonInput, useIonViewDidEnter} from "@ionic/react";
import React, {useEffect, useRef} from "react";
import style from './AsciiInput.module.css'

interface AsciiInputComponentProps {
    label: string
    value: string
    onIonChange?: (e: CustomEvent) => void
    required?: boolean
    placeholder?: string
    smallText?: boolean
    disabled?: boolean
    onBlur?: (e: any) => void
    autoFocus?: boolean
}

/**
 *
 * @param props.label Nom du champ
 * @param props.value Valeur du champ
 * @param props.onIonChange Fonction à appeler lors d'un changement de valeur
 * @param props.required - Booléen indiquant si le champ est requis ou non (fait apparaitre une étoile)
 * @param props.placeholder - Texte à afficher dans le champ lorsqu'il est vide
 * @param props.smallText - Si passé, réduit la taille du texte dans l'input
 * @param props.disabled - Si passé, affiche un "$" à la place du ">" dans le prompt et désactive l'input
 * @param props.autoFocus - Si passé, focus l'input au chargement de la page
 * @constructor
 */
export function AsciiInputComponent(props: AsciiInputComponentProps) {


    // Hook de Ionic qui s'exécute à l'affichage du composant.
    // Focus l'input si props.autoFocus est passé
    useIonViewDidEnter(() => {
        if (props.autoFocus) {
            const input = document.querySelector('ion-input')
            input?.setFocus()
        }
    })




    return (
        <div className={style.asciiItem}>
            <span className={props.smallText ? style.asciiSmallLabel : style.asciiLabel}>
                {props.required && <span>*</span>}{props.label}{props.disabled ? <span className={props.smallText? style.littlePrompt : style.prompt }>$ </span> : <span className={props.smallText? style.littlePrompt : style.prompt }>&#62;_ </span>}</span>
            <IonInput
                value={props.value}
                placeholder={props.placeholder}
                onIonChange={props.onIonChange}
                className={props.smallText ? style.asciiSmallInput : style.asciiInput}
                disabled={props.onIonChange === undefined}
                onBlur={props.onBlur}
            />
        </div>
    );
}