import React, {useEffect, useState} from 'react';
import {IonButton, IonButtons, IonContent, IonLoading, IonPage, IonToast} from "@ionic/react";
import {useHistory, useLocation} from "react-router";
import {Computer} from "../../../commons/models";
import {EditComputerComponent} from "../../computer/EditComputer/components/EditComputer.component";
import {CardComponent} from "../../../commons/components";
import useLoans from "../../../commons/hooks/loans/useLoans";
import LoanService from "../../../commons/services/loan/Loan.service";
import Loan from "../../../commons/models/loan/Loan.model";
import CourseFormComponent from "../../../commons/components/Forms/CourseForm/CourseForm.component";
import style from "./EndLoan.module.css";
import IndividualLoanFormComponent
    from "../../../commons/components/Forms/IndividualLoanForm/IndividualLoanForm.component";

/**
 * Page de clôture de prêt
 */
function EndLoanPage() {
    const location = useLocation<{ computer: Computer, comeFrom: string }>();
    const [computer, setComputer] = useState({} as Computer);
    const [origin, setOrigin] = useState<string>('');
    const [loan, setLoan] = useState({} as Loan);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [isToastOpen, setToastOpen] = useState<boolean>(false);
    const [toastColor, setToastColor] = useState('success');

    const router = useHistory();
    const {endLoan, error} = useLoans();

    useEffect(() => {
        if (!location.state) return;
        setComputer(location.state.computer);
        setOrigin(location.state.comeFrom);
    }, [location.state]);

    useEffect(() => {
        (async () => {
            if (!computer.id) return;
            try {
                const loan = await LoanService.findByComputerIdAndInProgressStatus(computer.id);
                setLoan(loan);
            } catch (e) {
                setToastMessage('Oops, une erreur est survenue ! Vérifiez la connexion au serveur et réessayez.');
                setToastColor('danger');
                setToastOpen(true);
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
            if (error) {
                setToastMessage('Oops, une erreur est survenue ! Vérifiez la connexion au serveur et réessayez.');
                setToastColor('danger');
                setToastOpen(true);
                return;
            }
            setToastMessage('Prêt clôturé ! ');
            setToastColor('success')
            setToastOpen(true);
            router.push(origin)
        } catch (e) {
            setToastMessage('Oops, une erreur est survenue ! Vérifiez la connexion au serveur et réessayez.');
            setToastColor('danger')
            setToastOpen(true);
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
                                computer={computer}
                                setComputer={setComputer}
                            />
                        }
                    />
                    {
                        loan.course && (
                            <CardComponent
                                title="Action"
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
                        loan.student && (
                            <CardComponent
                                title="Emprunteur"
                                content={
                                    <IndividualLoanFormComponent
                                        loan={loan}
                                        setLoan={() => {}}
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
                    <div className="sticky">
                        <IonButton
                            className="red"
                            onClick={() => router.push(origin)}
                        >
                            Retour
                        </IonButton>
                        <IonButton
                            className="green"
                            type="submit"
                            disabled={!loan.course && !loan.student}
                        >
                            Clôturer
                        </IonButton>
                    </div>
                </form>
                <div className={style.padding}/>
            </IonContent>
            <IonToast
                isOpen={isToastOpen}
                message={toastMessage}
                duration={3000}
                onDidDismiss={() => setToastOpen(false)}
                position="top"
                color={toastColor}
            />
        </IonPage>
    );
}

export default EndLoanPage;