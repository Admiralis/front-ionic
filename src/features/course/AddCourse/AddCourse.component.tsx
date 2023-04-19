import React from 'react';
import CourseFormComponent from "commons/components/Forms/CourseForm/CourseForm.component";
import {Course} from "commons/models";
import {AsciiInputComponent, HorizontalDividerComponent} from "commons/components";

interface AddCourseComponentProps {
    newCourseInfo: Course;
    setNewCourseInfo: (newCourseInfo: Course) => void;
    computerSerial: string;
    setComputerSerial: (computerSerial: string) => void;
}

/**
 * Composant formulaire de création de cours
 * @param props
 * @constructor
 */
const AddCourseComponent = (props: AddCourseComponentProps) => {
    const {newCourseInfo, setNewCourseInfo, computerSerial, setComputerSerial} = props;
    return (
            <div className="container">
                <p>
                    Remplissez le formulaire et scannez le PC
                </p>
                <CourseFormComponent newCourseInfo={newCourseInfo} setNewCourseInfo={setNewCourseInfo}/>
                <HorizontalDividerComponent/>
                <AsciiInputComponent
                    value={computerSerial}
                    label="SerialNumber"
                    onIonChange={e => {
                        setComputerSerial(e.detail.value!)
                    }}
                    autoFocus
                />
            </div>
    );
};

export default AddCourseComponent;