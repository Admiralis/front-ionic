import React from "react";
import './ComputerAddForm.component.css'
import {AsciiInputComponent} from "../Inputs/AsciiInput/AsciiInput.component";
import {HorizontalDividerComponent} from "../../index";
import {NewComputer} from "../../../models";

interface ComputerAddFormComponentProps {
    computerSerial: string;
    setComputerSerial: (computerSerial: string) => void;

    newComputerInfo: NewComputer;

    setNewComputerInfo: (newComputerInfo: NewComputer) => void;

}

export const ComputerAddFormComponent = (props: ComputerAddFormComponentProps) => {

    const onChange = (e: any) => {
        props.setNewComputerInfo(
            {
                ...props.newComputerInfo,
                [e.detail.name]: e.detail.value!
            }
        )
    }

    return (
        <>
            <div className="container">
                <AsciiInputComponent label="Catégorie" value={props.newComputerInfo.computerCategory || ''} onIonChange={onChange}/>
                <AsciiInputComponent label="RAM" value={props.newComputerInfo.computerRam || ""} onIonChange={onChange}/>
                <AsciiInputComponent label="Processeur" value={props.newComputerInfo.computerCpu || ""} onIonChange={onChange}/>
                <AsciiInputComponent label="Etat" value={props.newComputerInfo.computerCondition || ""} onIonChange={onChange}/>
                <HorizontalDividerComponent/>
                <AsciiInputComponent
                    value={props.computerSerial}
                    label="SerialNumber"
                    onIonChange={e => props.setComputerSerial(e.detail.value!)}
                />
            </div>
        </>
    )
};