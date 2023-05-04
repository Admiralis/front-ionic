import React, {useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent} from "commons/components";
import IndividualLoanFormComponent from "commons/components/Forms/IndividualLoanForm/IndividualLoanForm.component";
import Loan from "commons/models/loan/Loan.model";
import HorizontalDividerComponent
    from "../../../commons/components/UiElements/HorizontalDivider/HorizontalDivider.component";
import {isValidateButtonDisabled} from "../../../commons/utils";

function CreateIndividualLoanPage() {

    const [loan, setLoan] = useState({} as Loan)
    const [computerSerial, setComputerSerial] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container" onSubmit={handleSubmit}>
                    <CardComponent
                        title="Prêt individuel"
                        subtitle="Remplissez le formulaire et scannez le PC"
                        content={
                            <>
                                <IndividualLoanFormComponent
                                    loan={loan}
                                    setLoan={setLoan}
                                />
                                <HorizontalDividerComponent/>
                                <AsciiInputComponent
                                    value={computerSerial}
                                    label="SerialNumber"
                                    onIonChange={e => {
                                        setComputerSerial(e.detail.value!);
                                    }}
                                    autoFocus
                                />
                            </>
                        }
                        actions={
                            <IonButton
                                className="green"
                                type="submit"
                                disabled={isValidateButtonDisabled(computerSerial, 7) || !loan.student?.firstName || !loan.student?.lastName}
                            >
                                Chercher PC
                            </IonButton>
                        }
                    />
                </form>
            </IonContent>
        </IonPage>
    );
}

export default CreateIndividualLoanPage;