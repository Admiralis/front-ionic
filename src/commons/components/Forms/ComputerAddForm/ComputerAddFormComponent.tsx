import React from "react";
import {HorizontalDividerComponent, AsciiInputComponent} from "commons/components";
import {NewComputer} from "commons/models";
import {ComputerFormComponent} from "../ComputerForm/ComputerForm.component";

interface ComputerAddFormComponentProps {
    computerSerial: string;
    setComputerSerial: (computerSerial: string) => void;

    newComputerInfo: NewComputer;

    setNewComputerInfo: (newComputerInfo: NewComputer) => void;

}

export const ComputerAddFormComponent = (props: ComputerAddFormComponentProps) => {

    return (
        <>
            <div className="container">
                <p>
                    Remplissez le formulaire et scannez le PC
                </p>
                <ComputerFormComponent newComputerInfo={props.newComputerInfo} setNewComputerInfo={props.setNewComputerInfo} />
                <HorizontalDividerComponent/>
                <AsciiInputComponent
                    value={props.computerSerial}
                    label="SerialNumber"
                    onIonChange={e => {
                        props.setComputerSerial(e.detail.value!)
                        props.setNewComputerInfo({
                            ...props.newComputerInfo,
                            serialNumber: e.detail.value!
                        })
                    }}
                    autoFocus
                />
            </div>
        </>
    )
};