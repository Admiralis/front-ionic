import React from "react";
import './ComputerAddForm.component.css'
import {AsciiInputComponent} from "../Inputs/AsciiInput/AsciiInput.component";

interface ComputerAddFormComponentProps {
    computerSerial: string;
    setComputerSerial: (computerSerial: string) => void;
}

export const ComputerAddFormComponent = (props: ComputerAddFormComponentProps) => {
    return (
        <>
            <div className="container">
                <AsciiInputComponent
                    value={props.computerSerial}
                    label="SerialNumber"
                    onIonChange={e => props.setComputerSerial(e.detail.value!)}
                />
            </div>
        </>
    )
};