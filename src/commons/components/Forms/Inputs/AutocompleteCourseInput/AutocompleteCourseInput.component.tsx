import React  from 'react';
import {IonButton, IonButtons, IonIcon} from "@ionic/react";
import {AsciiInputComponent} from "../AsciiInput/AsciiInput.component";
import {Course} from "../../../../models";
import {search} from "ionicons/icons";
import {SimpleModalComponent} from "../../../index";
import CourseFormComponent from "../../CourseForm/CourseForm.component";
import {SearchCourse} from "./SearchCourse/SearchCourse";
import styles from './AutocompleteCourseInput.module.css';

interface AutocompleteCourseInputComponentProps {
    course?: Course;
    setCourse: (newCourse: Course) => void;
}

function AutocompleteCourseInputComponent(props: AutocompleteCourseInputComponentProps) {
    const [isFindCourseModalOpen, setIsFindCourseModalOpen] = React.useState<boolean>(false)
    const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = React.useState<boolean>(false);
    const [newCourse, setNewCourse] = React.useState<Course>({startDate: new Date()} as Course);

    const {setCourse, course} = props;

    return (
        <>
        <span
            style={{width: '100%', marginLeft: '5%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <AsciiInputComponent label={"Formation"} value={course?.label || ''} />
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
                    <span className={styles.form}>
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
                    </span>
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
                                        className='yellow'
                                        onClick={() => {
                                            setIsCreateCourseModalOpen(false)
                                        }}
                                    >
                                        Rechercher
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