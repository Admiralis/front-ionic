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
import CourseService from "../../../commons/services/course/Course.service";
import useCourses from "../../../commons/hooks/courses/useCourses";
import PATHS from "../../../commons/constants/PATHS";

/**
 * Page de création de cours
 * @constructor
 */
const AddCoursePage = () => {

    const [course, setCourse] = React.useState({} as Course)
    const [computerSerial, setComputerSerial] = React.useState("");
    const [autoSubmit, setAutoSubmit] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [scanning, setScanning] = React.useState<boolean>(false);


    const location = useLocation<{ serialNumber: string, comeFrom: string }>();
    const {autoScan} = useAutoRescan();
    const router = useHistory();

    useEffect(() => {
        setScanning(autoScan);
    }, [autoScan])

    useEffect(() => {
        setCourse({
            ...course,
            startDate: new Date(),
        } as Course)
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

    /**
     * Créé un cours s'il n'exista pas déjà, sinon le récupère puis redirige vers la page de confirmation si le matériel existe bien
     * @param event
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        CourseService.saveCourse(course).then((createdCourse) => {
            setCourse({
                ...createdCourse,
                id: createdCourse.id,
                startDate: new Date(createdCourse.startDate),
                endDate: createdCourse.endDate ? new Date(createdCourse.endDate) : null
            })
        })

        ComputerService.findComputerBySerial(computerSerial).then((computer) => {
            router.push(PATHS.LOANS.newCollective, {
                computer: computer,
                course: course,
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
                            <IonButton
                                className="green"
                                type="submit"
                                disabled={isValidateButtonDisabled(computerSerial, 7) || (!course.label || course.label.length < 3) }
                                data-testid="submit-button"
                            >
                                Valider
                            </IonButton>}

                    />
                </form>
            </IonContent>
            <UnknownComputerModalComponent
                open={open}
                setIsOpen={setOpen}
                onComputerAdd={() => {
                    router.push(PATHS.COMPUTERS.new, {
                        computer: {serialNumber: computerSerial},
                        course: course,
                        comeFrom: router.location.pathname
                    });
                    setOpen(false);
                }
                }
                onCancel={() => {
                    setOpen(false);
                    setComputerSerial('');
                }}
            />
        </IonPage>
    );
};

export default AddCoursePage;