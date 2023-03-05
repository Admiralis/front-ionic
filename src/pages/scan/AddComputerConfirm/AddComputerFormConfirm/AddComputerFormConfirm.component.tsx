import {ComputerFormComponent} from "../../../../commons/components/Forms/ComputerForm/ComputerForm.component";
import {AsciiInputComponent} from "../../../../commons/components";
import React from "react";
import {NewComputer} from "../../../../commons/models";

interface AddComputerFormConfirmComponentProps {
    newComputerInfo: NewComputer
    setNewComputerInfo: (newComputerInfo: NewComputer) => void;
}

export const AddComputerFormConfirmComponent = (props: AddComputerFormConfirmComponentProps) => {
    return (
        <>
            <ComputerFormComponent newComputerInfo={props.newComputerInfo}
                                   setNewComputerInfo={props.setNewComputerInfo}/>
            <AsciiInputComponent
                value={props.newComputerInfo.computerSerial}
                label="SerialNumber"
                onIonChange={e => {
                    props.setNewComputerInfo({
                        ...props.newComputerInfo,
                        computerSerial: e.detail.value!
                    })
                }}
            />
        </>
    )
}