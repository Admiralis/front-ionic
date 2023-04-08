import React from 'react';
import {IonButton, IonButtons, IonContent, IonPage} from "@ionic/react";
import {useHistory, useLocation} from "react-router";
import {Computer, Course} from "../../../commons/models";
import {EditComputerComponent} from "../../computer/EditComputer/components/EditComputer.component";
import {CardComponent} from "../../../commons/components";
import CourseFormComponent from "../../../commons/components/Forms/CourseForm/CourseForm.component";

const AddCourseConfirmPage = () => {

    const router = useHistory();
    const location = useLocation<{ comeFrom: string, newComputerState: Computer, newCourseState: Course }>();

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
                                            newComputerInfo={location.state.newComputerState}
                                            setNewComputerInfo={() => {
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
                                                newCourseInfo={location.state.newCourseState}
                                                setNewCourseInfo={() => {
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
                                    <IonButton className="yellow" expand="block">Terminer</IonButton>
                                </div>
                                <div>
                                    <IonButton className="red"> Annuler </IonButton>
                                    <IonButton className="green">Valider</IonButton>
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
