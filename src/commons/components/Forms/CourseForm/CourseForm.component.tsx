import React, {useState} from 'react';
import {Course} from "../../../models";
import {AsciiInputComponent} from "../Inputs/AsciiInput/AsciiInput.component";
import {IonDatetime, IonModal} from "@ionic/react";
import {AsciiDatePickerComponent} from "../../components/Forms/Inputs/AsciiDate/AsciiDate.component";

interface CourseFormComponentProps {
    newCourseInfo: Course;
    setNewCourseInfo: (newCourseInfo: Course) => void;
}

const CourseFormComponent = (props: CourseFormComponentProps) => {
    const {newCourseInfo = {} as Course, setNewCourseInfo} = props

    return <>
        <AsciiInputComponent label="Intitulé" value={newCourseInfo.label || ""}
                             onIonChange={(e: any) => {
                                 setNewCourseInfo({
                                     ...newCourseInfo,
                                     label: e.detail.value!
                                 })
                             }}
                             required
        />
        <AsciiDatePickerComponent
            label="Début"
            value={newCourseInfo.startDate}
            onChange={(e) => {
                setNewCourseInfo({
                    ...newCourseInfo,
                    startDate: new Date(e.detail.value?.slice(0, 10) as string)
                })
            }}
        />
        <AsciiDatePickerComponent
            label="Fin"
            value={newCourseInfo.endDate}
            onChange={(e) => {
                setNewCourseInfo({
                    ...newCourseInfo,
                    endDate: new Date(e.detail.value?.slice(0, 10) as string)
                })
            }}
        />
        <AsciiInputComponent label="Lieu" value={newCourseInfo.place || ""}
                             onIonChange={(e: any) => {
                                 setNewCourseInfo({
                                     ...newCourseInfo,
                                     place: e.detail.value!
                                 })
                             }}
        />

    </>;
};

export default CourseFormComponent;

