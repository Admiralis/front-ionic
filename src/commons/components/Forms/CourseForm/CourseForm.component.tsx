import React from 'react';
import {Course} from "../../../models";
import {AsciiInputComponent} from "../Inputs/AsciiInput/AsciiInput.component";

interface CourseFormComponentProps {
    newCourseInfo: Course;
    setNewCourseInfo: (newCourseInfo: Course) => void;
}

const CourseFormComponent = (props: CourseFormComponentProps) => {
    const {newCourseInfo = {} as Course, setNewCourseInfo} = props
    return (
        <>
            <AsciiInputComponent label="Intitulé *" value={newCourseInfo.label || ""}
                                 onIonChange={(e: any) => {

                                     setNewCourseInfo({
                                         ...newCourseInfo,
                                         label: e.detail.value!
                                     })
                                 }}
            />
            <AsciiInputComponent label="Date de début *"
                                 value={newCourseInfo.startDate?.toLocaleDateString() || ""}
                                 onIonChange={(e: any) => {

                                     setNewCourseInfo({
                                         ...newCourseInfo,
                                         startDate: e.detail.value && new Date(e.detail.value!)
                                     })
                                 }}
            />
            <AsciiInputComponent label="Date de fin"
                                 value={newCourseInfo.endDate?.toLocaleDateString() || ""}
                                 onIonChange={(e: any) => {
                                     setNewCourseInfo({
                                         ...newCourseInfo,
                                         endDate: new Date(e.detail.value!)
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

        </>
    );
};

export default CourseFormComponent;