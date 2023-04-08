import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {CardComponent, UnknownComputerModalComponent} from "../../../commons/components";
import {Course} from "../../../commons/models";
import AddCourseComponent from "./AddCourse.component";
import {isValidateButtonDisabled, submitOnEnter} from "../../../commons/utils";
import {useHistory, useLocation} from "react-router";
import useAutoRescan from "../../../commons/hooks/scan/useAutoRescan";
import {Simulate} from "react-dom/test-utils";
import {ComputerService} from "../../../commons/services/computer";

const AddCoursePage = () => {

    const [course, setCourse] = React.useState({} as Course)
    const [computerSerial, setComputerSerial] = React.useState("");
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [scanning, setScanning] = useState<boolean>(false);


    const location = useLocation<{ newComputerSerial: string, comeFrom: string }>();
    const {autoScan} = useAutoRescan();
    const router = useHistory();

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
        ComputerService.findComputerBySerial(computerSerial).then((computer) => {
            console.log('found :', computer)
            console.log('course :', course)
            router.push('/scan/course/confirm', {
                newComputerState: computer,
                newCourseState: course,
                comeFrom: location.pathname
            })
            setComputerSerial('');
        }).catch(() => {
            setOpen(true)
        })
    }

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container" onSubmit={handleSubmit} onKeyDown={submitOnEnter}>
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
            <UnknownComputerModalComponent
                open={open}
                setIsOpen={setOpen}
                onComputerAdd={() => {
                    console.log('add computer')
                    router.push('/scan/add/confirm', {
                        newComputerState: {serial: computerSerial},
                        comeFrom: '/scan/course/confirm'
                    });
                    setOpen(false);
                    setComputerSerial('');
                }
                }
                onCancel={() => {
                    console.log('cancel')
                    setOpen(false);
                    setComputerSerial('');
                }}
            />
        </IonPage>
    );
};

export default AddCoursePage;