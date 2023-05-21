import {ComputerFormComponent} from "commons/components/Forms/ComputerForm/ComputerForm.component";
import {AsciiInputComponent} from "commons/components";
import React from "react";
import {NewComputer} from "commons/models";
import {CommentsComponent} from "commons/components/Forms/Comments/Comments.component";
import {Computer} from "../../../../commons/models";

interface AddComputerFormConfirmComponentProps {
    computer: Computer;
    setComputer: (newComputerInfo: NewComputer | Computer) => void;
}


export const EditComputerComponent = (props: AddComputerFormConfirmComponentProps) => {

    const {
        computer = {serialNumber: ''} as Computer,
        setComputer = () => {}
    } = props;

    return (
        <>
            <div className="container">
                <ComputerFormComponent newComputerInfo={computer}
                                       setNewComputerInfo={setComputer}/>
                <AsciiInputComponent
                    value={computer.serialNumber || ''}
                    label="SerialNumber"
                />
            </div>
            <CommentsComponent comments={computer.comments}
                               setComments={(comments) => setComputer(
                                   {
                                       ...computer,
                                       comments: comments
                                   }
                               )}
            />
        </>
    )
}