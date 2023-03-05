import {IonInput} from "@ionic/react";
import React from "react";
import style from './AsciiInput.module.css'

interface AsciiInputComponentProps {
    label: string
    value: string
    onIonChange: (e: CustomEvent) => void

    required?: boolean
    placeholder?: string
}

export function AsciiInputComponent(props: AsciiInputComponentProps) {
    return (
        <div className={style.asciiItem}>
            <span className={style.asciiLabel}>{props.required && <span>*</span>}{props.label} &#62;_</span>
            <IonInput
                value={props.value}
                placeholder={props.placeholder}
                onIonChange={props.onIonChange}
                className={style.asciiInput}
            />
        </div>
    );
}