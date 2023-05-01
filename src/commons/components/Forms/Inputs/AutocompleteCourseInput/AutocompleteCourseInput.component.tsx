import React, {useEffect, useMemo, useState} from 'react';
import {IonButton, IonButtons, IonContent, IonIcon, IonList, IonSearchbar} from "@ionic/react";
import {AsciiInputComponent} from "../AsciiInput/AsciiInput.component";
import {Course} from "../../../../models";
import {addOutline, search} from "ionicons/icons";
import {SimpleModalComponent} from "../../../index";
import CourseFormComponent from "../../CourseForm/CourseForm.component";
import CourseService from "../../../../services/course/Course.service";

interface SearchCourseProps {
    course?: Course;
    setCourse?: (newCourse: string) => void;
}

function SearchCourse(props: SearchCourseProps) {

    const {course} = props;

    const [querry, setQuerry] = useState<string>('');
    const [results, setResults] = useState<Course[]>([]);

    const handleQuery = (e: CustomEvent) => {
        const target = e.target as HTMLIonSearchbarElement;
        if (target.value) {
            setQuerry(target.value);
        }
    }

    useEffect(() => {
        CourseService.findInProgressCoursesByLabel(querry).then((courses: Course[]) => {
            setResults(courses);
            console.log(results)
        })
    }, [querry])

    return (
        <IonContent>
            <div>
                <IonSearchbar
                    onIonInput={handleQuery}
                    debounce={1000}
                    placeholder={"Rechercher une formation"}
                    onIonClear={() => setQuerry('')}
                />
                <IonList>
                    {results.map((course: Course) => (
                        <IonButton
                            key={course.id}
                            className='green large'
                            onClick={() => {

                            }}
                        >
                            {course.label + ' du ' + course.startDate}
                        </IonButton>
                    ))}
                    {
                        useMemo(() => {
                                if (results.length === 0) {
                                    return (
                                        <IonButton
                                            className='green large'
                                            onClick={() => {

                                            }}
                                        >
                                            <IonIcon icon={addOutline}/>
                                        </IonButton>
                                    )
                                }
                            }
                            , [results])
                    }
                </IonList>
            </div>
        </IonContent>
    )
}

interface AutocompleteCourseInputComponentProps {
    course?: Course;
    setCourse?: (newCourse: string) => void;
}

function AutocompleteCourseInputComponent(props: AutocompleteCourseInputComponentProps) {
    const [isFindCourseModalOpen, setIsFindCourseModalOpen] = useState<boolean>(false)
    const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState<boolean>(false)

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
                        <SearchCourse course={course} setCourse={setCourse}/>
                    </>
                }
            />
        </>
    );
}

export default AutocompleteCourseInputComponent;