import React, {useEffect, useState} from 'react';
import {IonButton, IonButtons, IonContent, IonPage} from "@ionic/react";
import {useHistory, useLocation} from "react-router";
import {Computer} from "../../../commons/models";
import {EditComputerComponent} from "../../computer/EditComputer/components/EditComputer.component";
import {CardComponent} from "../../../commons/components";
import useLoans from "../../../commons/hooks/loans/useLoans";
import LoanService from "../../../commons/services/loan/Loan.service";
import Loan from "../../../commons/models/loan/Loan.model";
import CourseFormComponent from "../../../commons/components/Forms/CourseForm/CourseForm.component";
import style from "./EndLoan.module.css";

function EndLoanPage() {
    const location = useLocation<{ computer: Computer, comeFrom: string }>();
    const [computer, setComputer] = useState({} as Computer);
    const [origin, setOrigin] = useState<string>('');
    const [loan, setLoan] = useState({} as Loan);

    const router = useHistory();
    const {endLoan, loans} = useLoans();

    useEffect(() => {
        if (!location.state) return;
        setComputer(location.state.computer);
        setOrigin(location.state.comeFrom);
    }, [location.state]);

    useEffect(() => {
        computer.id && LoanService.findByComputerIdAndInProgressStatus(computer.id).then(loan => {
            setLoan(loan);
        })
    }, [computer]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        endLoan(loan)
        router.push(origin)
    }

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container" onSubmit={handleSubmit}>
                    <CardComponent
                        title="Retour au stock"
                        content={
                            <EditComputerComponent
                                newComputerInfo={computer}
                                setNewComputerInfo={setComputer}
                            />
                        }
                    />
                    {
                        loan.course && (
                            <CardComponent
                                title="Prêt en cours"
                                content={
                                    <CourseFormComponent
                                        newCourseInfo={loan.course}
                                        setNewCourseInfo={() => {
                                        }}
                                    />
                                }
                            />
                        )
                    }
                    {
                        !loan.course && !loan.student && (
                            <CardComponent
                                title="Prêt en cours"
                                content={
                                    <p>Aucun prêt en cours</p>
                                }
                            />
                        )
                    }
                    <IonButtons className="sticky">
                        <IonButton className="red"
                                   onClick={() => router.push(origin)}>Retour</IonButton>
                        <IonButton className="green" type="submit">Clôturer</IonButton>
                    </IonButtons>
                </form>
                <div className={style.padding} />
            </IonContent>
        </IonPage>
    );
}

export default EndLoanPage;