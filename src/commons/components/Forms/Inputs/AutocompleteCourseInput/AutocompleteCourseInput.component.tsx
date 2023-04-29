import React from 'react';
import {IonButton, IonButtons, IonIcon} from "@ionic/react";
import style from './AutocompleteCourseInput.module.css';
import {AsciiInputComponent} from "../AsciiInput/AsciiInput.component";
import {Course} from "../../../../models";
import { addOutline, search} from "ionicons/icons";

interface AutocompleteCourseInputComponentProps {
    course?: Course;
    setCourse?: (newCourse: string) => void;
}

function AutocompleteCourseInputComponent(props: AutocompleteCourseInputComponentProps) {
    return (
        <span
            style={{width: '100%', marginLeft: '5%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <AsciiInputComponent label={"Formation"} value={props.course?.label || ''} />
            <IonButtons>
                <IonButton icon-only className='icon'>
                    <IonIcon icon={search}/>
                </IonButton>
                <IonButton icon-only className='icon'>
                    <IonIcon icon={addOutline}/>
                </IonButton>
            </IonButtons>
        </span>
    );
}

export default AutocompleteCourseInputComponent;