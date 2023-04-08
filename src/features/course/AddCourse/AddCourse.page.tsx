import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "../../../commons/components";
import {Course} from "../../../commons/models";
import AddCourseComponent from "./AddCourse.component";
import {isValidateButtonDisabled} from "../../../commons/utils";
import {useHistory, useLocation} from "react-router";
import useAutoRescan from "../../../commons/hooks/scan/useAutoRescan";
import {Simulate} from "react-dom/test-utils";

const AddCoursePage = () => {

    const [course, setCourse] = React.useState({} as Course)
    const [computerSerial, setComputerSerial] = React.useState("");
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [scanning, setScanning] = useState<boolean>(false);


    const location = useLocation<{newComputerSerial: string, comeFrom: string }>();
    const {autoScan} = useAutoRescan();
    const history = useHistory();

    useEffect(() => {
        setScanning(autoScan);
    }, [autoScan])

    useEffect(() => {
        setCourse({
            ...course,
            startDate: new Date()
        })
    }, [])

    useEffect(() => {
        // Met le numéro de série en toute majuscule
        // La double dépendance assure le bon rafraichissement des données
        computerSerial && setComputerSerial(computerSerial.toUpperCase());
    }, [computerSerial]);

    useEffect(() => {
        // Soumet automatiquement le formulaire si un code a été scanné
        if (autoSubmit) {
            Simulate.submit(document.querySelector('form') as HTMLFormElement)
            setScanning(false);
            setAutoSubmit(false)
        }
    }, [autoSubmit])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(course);
    }

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container" onSubmit={handleSubmit}>
                    <CardComponent
                        title="Prêt collectif"
                        content={<AddCourseComponent newCourseInfo={course}
                                                     setNewCourseInfo={setCourse}
                                                     computerSerial={computerSerial}
                                                     setComputerSerial={setComputerSerial}/>}
                        actions={
                            <IonButton className="green" type="submit"
                                       disabled={isValidateButtonDisabled(computerSerial, 7)}>
                                Valider
                            </IonButton>}

                    />
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddCoursePage;