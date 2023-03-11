import {IonInput} from "@ionic/react";
import React, {useEffect} from "react";
import style from './AsciiInput.module.css'

interface AsciiInputComponentProps {
    label: string
    value: string
    onIonChange?: (e: CustomEvent) => void

    required?: boolean
    placeholder?: string
    smallText?: boolean
    noPrompt?: boolean
}

export function AsciiInputComponent(props: AsciiInputComponentProps) {

    return (
        <div className={style.asciiItem}>
            <span className={props.smallText ? style.asciiSmallLabel : style.asciiLabel}>
                {props.required && <span>*</span>}{props.label}{props.noPrompt ? <span className={props.smallText? style.littlePrompt : style.prompt }>$_ </span> : <span className={props.smallText? style.littlePrompt : style.prompt }>&#62;_ </span>}</span>
            <IonInput
                value={props.value}
                placeholder={props.placeholder}
                onIonChange={props.onIonChange}
                className={props.smallText ? style.asciiSmallInput : style.asciiInput}
                disabled={props.onIonChange === undefined}
            />
        </div>
    );
}