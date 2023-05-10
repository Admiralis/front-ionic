import React, {useEffect, useState} from "react";
import {Course} from "../../../../../models";
import CourseService from "../../../../../services/course/Course.service";
import {IonButton, IonContent, IonList, IonSearchbar} from "@ionic/react";
import styles from "./SearchCourse.module.css";

interface SearchCourseProps {
    setCourse: (newCourse: Course) => void;
}

export function SearchCourse(props: SearchCourseProps) {

    const {setCourse} = props;

    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Course[]>([]);


    const handleQueryChange = (e: Event) => {
        const target: HTMLIonSearchbarElement = e.target as HTMLIonSearchbarElement;
        if (target.value) {
            setQuery(target.value);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const courses = await CourseService.findInProgressCoursesByLabel(query);
                setResults(courses);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [query])

    return (
        <>
            <IonContent className={styles.content}>
                <>
                    <IonSearchbar
                        onIonInput={handleQueryChange}
                        debounce={1000}
                        placeholder={"Rechercher une formation"}
                        onIonClear={() => setQuery('')}
                        data-testid='searchbar'
                        class={styles.searchbar}
                    />
                    <IonList data-testid='course-list' className={styles.ionList} >
                        {
                            results.map((course: Course) => (
                                <IonButton
                                    data-testid={'course-button-' + course.id}
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