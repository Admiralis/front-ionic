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

/**
 * Page de clôture de prêt
 */
function EndLoanPage() {
    const location = useLocation<{ computer: Computer, comeFrom: string }>();
    const [computer, setComputer] = useState({} as Computer);
    const [origin, setOrigin] = useState<string>('');
    const [loan, setLoan] = useState({} as Loan);

    const router = useHistory();
    const {endLoan} = useLoans();

    useEffect(() => {
        if (!location.state) return;
        setComputer(location.state.computer);
        setOrigin(location.state.comeFrom);
    }, [location.state]);

    useEffect(() => {
        // computer.id && LoanService.findByComputerIdAndInProgressStatus(computer.id).then(loan => {
        //     setLoan(loan);
        // })
        (async () => {
            if (!computer.id) return;
            try {
                const loan = await LoanService.findByComputerIdAndInProgressStatus(computer.id);
                setLoan(loan);
            } catch (e) {
                console.error(e);
            }
        })()
    }, [computer]);

    /**
     * Envoi la requête de clôture de prêt et redirige vers la page de recherche d'ordinateur.
     * @param e
     */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await endLoan(loan)
            router.push(origin)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container" onSubmit={async (event) => {await handleSubmit(event)}}>
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
                        <IonButton className="green" type="submit"
                                   disabled={!loan.course && !loan.student}>Clôturer</IonButton>
                    </IonButtons>
                </form>
                <div className={style.padding}/>
            </IonContent>
        </IonPage>
    );
}

export default EndLoanPage;