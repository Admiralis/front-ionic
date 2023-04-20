import {ComputerFormComponent} from "commons/components/Forms/ComputerForm/ComputerForm.component";
import {AsciiInputComponent} from "commons/components";
import React, {useEffect} from "react";
import {NewComputer} from "commons/models";
import {CommentsComponent} from "commons/components/Forms/Comments/Comments.component";
import {Computer} from "../../../../commons/models";

interface AddComputerFormConfirmComponentProps {
    newComputerInfo: Computer;
    setNewComputerInfo: (newComputerInfo: NewComputer | Computer) => void;
}


export const EditComputerComponent = (props: AddComputerFormConfirmComponentProps) => {

    useEffect(() => {

    }, [props])

    return (
        <>
            <div className="container">
                <ComputerFormComponent newComputerInfo={props.newComputerInfo}
                                       setNewComputerInfo={props.setNewComputerInfo}/>
                <AsciiInputComponent
                    value={props.newComputerInfo.serialNumber || ''}
                    label="SerialNumber"
                />
            </div>
            <CommentsComponent comments={props.newComputerInfo.comments}
                               setComments={(comments) => props.setNewComputerInfo(
                                   {
                                       ...props.newComputerInfo,
                                       comments: comments
                                   }
                               )}
            />
        </>
    )
}