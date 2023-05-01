import React, {useState} from 'react';
import {IonButton, IonButtons, IonContent, IonIcon, IonList} from "@ionic/react";
import {AsciiInputComponent} from "../AsciiInput/AsciiInput.component";
import {Course} from "../../../../models";
import {addOutline, search} from "ionicons/icons";
import {SimpleModalComponent} from "../../../index";
import CourseFormComponent from "../../CourseForm/CourseForm.component";

interface AutocompleteCourseInputComponentProps {
    course?: Course;
    setCourse?: (newCourse: string) => void;
}

function AutocompleteCourseInputComponent(props: AutocompleteCourseInputComponentProps) {
    const [isFindCourseModalOpen, setIsFindCourseModalOpen] = useState<boolean>(false)
    const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState<boolean>(false)
    const [course, setCourse] = useState<Course>({} as Course)

    return (
        <>
        <span
            style={{width: '100%', marginLeft: '5%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <AsciiInputComponent label={"Formation"} value={props.course?.label || ''}/>
            <IonButtons>
                <IonButton icon-only className='icon' onClick={() => setIsFindCourseModalOpen(true)}>
                    <IonIcon icon={search}/>
                </IonButton>
                <IonButton icon-only className='icon'>
                    <IonIcon icon={addOutline}/>
                </IonButton>
            </IonButtons>
        </span>
            <SimpleModalComponent
                isOpen={isFindCourseModalOpen}
                setIsOpen={setIsFindCourseModalOpen}
                title={"Rechercher une formation"}
                content={
                    <>
                        <IonContent>
                            <div>
                                <AsciiInputComponent label={"Formation"} value={course.label || ''}/>
                                <IonList/>
                            </div>
                        </IonContent>
                    </>
                }
            />
        </>
    );
}

export default AutocompleteCourseInputComponent;