import React, {useEffect, useState} from 'react';
import {IonButton, IonButtons, IonIcon} from "@ionic/react";
import {AsciiInputComponent} from "../AsciiInput/AsciiInput.component";
import {Course} from "../../../../models";
import {search} from "ionicons/icons";
import {SimpleModalComponent} from "../../../index";
import CourseFormComponent from "../../CourseForm/CourseForm.component";
import {SearchCourse} from "./SearchCourse/SearchCourse";

interface AutocompleteCourseInputComponentProps {
    course?: Course;
    setCourse: (newCourse: Course) => void;
}

function AutocompleteCourseInputComponent(props: AutocompleteCourseInputComponentProps) {
    const [isFindCourseModalOpen, setIsFindCourseModalOpen] = useState<boolean>(false)
    const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState<boolean>(false);
    const [newCourse, setNewCourse] = useState<Course>({startDate: new Date()} as Course);

    const {course, setCourse} = props;

    return (
        <>
        <span
            style={{width: '100%', marginLeft: '5%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <AsciiInputComponent label={"Formation"} value={props.course?.label || ''}/>
            <IonButtons>
                <IonButton icon-only className='icon' onClick={() => setIsFindCourseModalOpen(true)}>
                    <IonIcon icon={search}/>
                </IonButton>
            </IonButtons>
        </span>
            <SimpleModalComponent
                isOpen={isFindCourseModalOpen}
                setIsOpen={setIsFindCourseModalOpen}
                title={"Rechercher une formation"}
                content={
                    <>
                        {
                            !isCreateCourseModalOpen && <SearchCourse setCourse={setCourse}/>
                        }
                        {
                            isCreateCourseModalOpen && (
                                <CourseFormComponent
                                    setNewCourseInfo={setNewCourse}
                                    newCourseInfo={newCourse}
                                />
                            )
                        }
                    </>
                }
                actions={
                    <>
                        {
                            !isCreateCourseModalOpen && (
                                <IonButton
                                    className='yellow large'
                                    onClick={() => {
                                        setIsCreateCourseModalOpen(true)
                                    }}
                                >
                                    Créer une formation
                                </IonButton>
                            )
                        }
                        {
                            isCreateCourseModalOpen && (
                                <IonButtons>

                                    <IonButton
                                        className='red'
                                        onClick={() => {
                                            setIsCreateCourseModalOpen(false)
                                        }}
                                    >
                                        Annuler
                                    </IonButton>
                                    <IonButton
                                        className='green'
                                        onClick={() => {
                                            setCourse(newCourse);
                                            setIsCreateCourseModalOpen(false)
                                            setIsFindCourseModalOpen(false)
                                        }}
                                    >
                                        Créer
                                    </IonButton>
                                </IonButtons>
                            )
                        }

                    </>
                }
            />
        </>
    );
}

export default AutocompleteCourseInputComponent;