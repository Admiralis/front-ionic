import React from 'react';
import {IonButton, IonButtons, IonContent, IonPage} from "@ionic/react";
import Loan from "commons/models/loan/Loan.model";
import {useHistory, useLocation} from "react-router";
import {CardComponent} from "../../../commons/components";
import {EditComputerComponent} from "../../computer/EditComputer/components/EditComputer.component";
import IndividualLoanFormComponent
    from "../../../commons/components/Forms/IndividualLoanForm/IndividualLoanForm.component";
import style from "../EndLoan/EndLoan.module.css";

interface EditIndividualLoanPageProps {

}

function EditIndividualLoanPage(props: EditIndividualLoanPageProps) {

    const [loan, setLoan] = React.useState({} as Loan)
    const [origin, setOrigin] = React.useState<string>('');

    const router = useHistory();
    const location = useLocation<{ loan: Loan, comeFrom: string }>();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(loan)
    }

    React.useEffect(() => {

        if (!location.state) {
            return;
        }

        if (location.state.loan) {
            setLoan(location.state.loan);
        }

        if (location.state.comeFrom) {
            setOrigin(location.state.comeFrom);
        } else {
            setOrigin('');
        }

    }, [location.state])

    return (
        <div>
            <IonPage>
                <IonContent>
                    <form className="flex-container" onSubmit={(event) => handleSubmit(event)}>

                        <CardComponent
                            title='Prêt'
                            content={
                                <IndividualLoanFormComponent
                                    loan={loan}
                                    setLoan={setLoan}
                                />
                            }
                        />

                        <CardComponent
                            title='Ordinateur'
                            content={
                                <EditComputerComponent
                                    newComputerInfo={loan.computer || {serialNumber: ''} as Loan['computer']}
                                    setNewComputerInfo={(newComputer) => {
                                        setLoan({
                                            ...loan,
                                            computer: newComputer
                                        })
                                    }}
                                />
                            }
                        />
                        <IonButtons className="sticky">
                            <IonButton onClick={() => router.push(origin)} className="yellow" >Annuler</IonButton>
                            <IonButton type="submit" className="green" >Valider</IonButton>
                        </IonButtons>
                    </form>
                    <div className={style.padding}/>
                </IonContent>
            </IonPage>
        </div>
    );
}

export default EditIndividualLoanPage;