import React, {useEffect, useState} from 'react';
import {IonButton, IonButtons, IonContent, IonPage} from "@ionic/react";
import {useHistory, useLocation} from "react-router";
import {Computer, NewComputer} from "../../../commons/models";
import {EditComputerComponent} from "../../computer/EditComputer/components/EditComputer.component";
import {CardComponent} from "../../../commons/components";
import useLoans from "../../../commons/hooks/loans/useLoans";
import LoanService from "../../../commons/services/loan/Loan.service";
import Loan from "../../../commons/models/loan/Loan.model";
import CourseFormComponent from "../../../commons/components/Forms/CourseForm/CourseForm.component";

function EndLoanPage() {
    const location = useLocation<{ computer: NewComputer, comeFrom: string }>();
    const [computer, setComputer] = useState({} as Computer);
    const [origin, setOrigin] = useState<string>('');
    const [loan, setLoan] = useState({} as Loan);

    const router = useHistory();

    useEffect(() => {
        if (!location.state) return;
        setComputer(location.state.computer);
        setOrigin(location.state.comeFrom);
    }, [location.state]);

    useEffect(() => {
        computer.id && LoanService.findLoanByComputerId(computer.id).then((loans) => {
            loans.map((loan) => {
                if (loan.loanStatus === "IN_PROGRESS") {
                    setLoan(loan);
                    console.log(loan)
                }
            })
        });
    }, [computer]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
                        actions={
                            <IonButtons>
                                <IonButton className="red" onClick={() => router.push(origin)}>Annuler</IonButton>
                                <IonButton className="green" type="submit">Valider</IonButton>
                            </IonButtons>
                        }
                    />
                    {
                        loan.course && (
                            <CardComponent
                                title="Prêt en cours"
                                content={
                                    <CourseFormComponent
                                        newCourseInfo={loan.course}
                                        setNewCourseInfo={() => {}}
                                    />
                                }
                            />
                        )
                    }
                </form>
            </IonContent>
        </IonPage>
    );
}

export default EndLoanPage;