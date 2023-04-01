import React from 'react';
import {IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "../../../commons/components";
import CourseFormComponent from "../../../commons/components/Forms/CourseForm/CourseForm.component";
import {Course} from "../../../commons/models";

const AddCoursePage = () => {

    const [course, setCourse] = React.useState({} as Course)

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container">
                    <CardComponent
                        title="Prêt collectif"
                        content={<CourseFormComponent newCourseInfo={course} setNewCourseInfo={setCourse}/>}
                        actions={<p>Actions</p>}

                    />
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddCoursePage;