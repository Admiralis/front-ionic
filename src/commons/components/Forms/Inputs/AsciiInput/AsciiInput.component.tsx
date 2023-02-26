import {IonInput} from "@ionic/react";
import React from "react";

interface AsciiInputComponentProps {
    label: string
    value: string
    onIonChange: (e: CustomEvent) => void
}

export function AsciiInputComponent(props: AsciiInputComponentProps) {
    return (
        <div className="ascii-item">
            <span className="ascii-label">{props.label} &#62;_</span>
            <IonInput
                value={props.value}
                placeholder="Numéro de série"
                onIonChange={props.onIonChange}
                className="ascii-input"
            />
        </div>
    );
}