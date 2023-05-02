import React, {useEffect, useState} from "react";
import {Course} from "../../../../../models";
import CourseService from "../../../../../services/course/Course.service";
import {IonButton, IonContent, IonList, IonSearchbar} from "@ionic/react";

interface SearchCourseProps {
    setCourse: (newCourse: Course) => void;
}

export function SearchCourse(props: SearchCourseProps) {

    const {setCourse} = props;

    const [querry, setQuerry] = useState<string>('');
    const [results, setResults] = useState<Course[]>([]);


    const handleQueryChange = (e: Event) => {
        const target: HTMLIonSearchbarElement = e.target as HTMLIonSearchbarElement;
        if (target.value) {
            setQuerry(target.value);
        }
    }

    useEffect(() => {
        CourseService.findInProgressCoursesByLabel(querry).then((courses: Course[]) => {
            setResults(courses);
        })
    }, [querry])

    return (
        <>
            <IonContent>
                <>
                    <IonSearchbar
                        onIonInput={handleQueryChange}
                        debounce={1000}
                        placeholder={"Rechercher une formation"}
                        onIonClear={() => setQuerry('')}
                    />
                    <IonList>
                        {
                            results.map((course: Course) => (
                                <IonButton
                                    key={course.id}
                                    className='green large'
                                    onClick={() => {
                                        setCourse(course);
                                    }}
                                >
                                    {course.label + ' du ' + new Date(course.startDate).toLocaleDateString().slice(0, 5)}
                                </IonButton>
                            ))
                        }
                    </IonList>
                </>
            </IonContent>
        </>
    )
}