import {ComputerFormComponent} from "../../../../commons/components/Forms/ComputerForm/ComputerForm.component";
import {AsciiInputComponent} from "../../../../commons/components";
import React from "react";
import {NewComputer} from "../../../../commons/models";
import {CommentsComponent} from "../../../../commons/components/Forms/Comments/Comments.component";

interface AddComputerFormConfirmComponentProps {
    newComputerInfo: NewComputer
    setNewComputerInfo: (newComputerInfo: NewComputer) => void;
}


export const AddComputerFormConfirmComponent = (props: AddComputerFormConfirmComponentProps) => {
    return (
        <div className="container">
            <ComputerFormComponent newComputerInfo={props.newComputerInfo}
                                   setNewComputerInfo={props.setNewComputerInfo}/>
            <AsciiInputComponent
                value={props.newComputerInfo.serial}
                label="SerialNumber"
                onIonChange={e => {
                    props.setNewComputerInfo({
                        ...props.newComputerInfo,
                        serial: e.detail.value!
                    })
                }}
            />
            <CommentsComponent comments={props.newComputerInfo.comments}
                               setComments={(comments) => props.setNewComputerInfo(
                                   {
                                       ...props.newComputerInfo,
                                       comments: comments
                                   }
                               )}/>
        </div>
    )
}