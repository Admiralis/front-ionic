import React, {useEffect, useState} from 'react';
import {IonButton, IonButtons, IonContent, IonPage} from "@ionic/react";
import {useHistory, useLocation} from "react-router";
import {Computer, Course, NewComputer} from "../../../commons/models";
import {EditComputerComponent} from "../../computer/EditComputer/components/EditComputer.component";
import {CardComponent} from "../../../commons/components";
import CourseFormComponent from "../../../commons/components/Forms/CourseForm/CourseForm.component";

const AddCourseConfirmPage = () => {

    const router = useHistory();
    const location = useLocation<{ comeFrom: string, newComputerState: Computer, newCourseState: Course }>();
    const [computer, setComputer] = useState({} as Computer);
    const [course, setCourse] = useState({} as Course);

    useEffect(() => {
        if (!location.state) {
            return;
        }

        if (location.state.newComputerState) {
            setComputer(location.state.newComputerState);
        }

        if (location.state.newCourseState) {
            setCourse(location.state.newCourseState);
        }

    }, [location.state]);

    const handleCancel = () => {
        router.push(location.state.comeFrom, {reScan: true});
    };

    const handleSubmitAndReScan = (e: any) => {
        e.preventDefault();
        router.push(location.state.comeFrom, {reScan: true});
    }

    const handleSubmitAndFinish = (e: any) => {
        e.preventDefault();
        router.push(location.state.comeFrom);
    }

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container">
                    <CardComponent
                        title="Valider"
                        content={
                            <>
                                <CardComponent
                                    title="Informations sur l'ordinateur"
                                    content={
                                        <EditComputerComponent
                                            newComputerInfo={computer}
                                            setNewComputerInfo={() => {
                                                setComputer(computer)
                                            }}
                                        />
                                    }
                                    tiny
                                />
                                <CardComponent
                                    title="Informations sur le prêt"
                                    content={
                                        <div>
                                            <CourseFormComponent
                                                newCourseInfo={course}
                                                setNewCourseInfo={() => {
                                                    setCourse(course)
                                                }}
                                            />
                                        </div>
                                    }
                                    tiny
                                />

                            </>
                        }
                        actions={
                            <>
                                <div>
                                    <IonButton className="yellow large" expand="block" onClick={handleSubmitAndFinish} >Terminer</IonButton>
                                </div>
                                <div>
                                    <IonButton className="red" onClick={handleCancel} > Annuler </IonButton>
                                    <IonButton className="green" onClick={handleSubmitAndReScan}> PC Suivant </IonButton>
                                </div>
                            </>
                        }
                    />
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddCourseConfirmPage;
