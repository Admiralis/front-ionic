import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent, UnknownComputerModalComponent} from "commons/components";
import IndividualLoanFormComponent from "commons/components/Forms/IndividualLoanForm/IndividualLoanForm.component";
import Loan from "commons/models/loan/Loan.model";
import HorizontalDividerComponent
    from "commons/components/UiElements/HorizontalDivider/HorizontalDivider.component";
import {isValidateButtonDisabled, submitOnEnter} from "commons/utils";
import {ComputerService} from "commons/services/computer";
import PATHS from "commons/constants/PATHS";
import {useHistory} from "react-router";
import {Student} from "commons/models";
import CodeScannerComponent from "../../../commons/components/CodeScanner/CodeScanner.component";
import useAutoRescan from "../../../commons/hooks/scan/useAutoRescan";
import {Simulate} from "react-dom/test-utils";

function CreateIndividualLoanPage() {

    const [loan, setLoan] = React.useState({} as Loan)
    const [computerSerial, setComputerSerial] = React.useState<string>('');
    const [open, setOpen] = React.useState<boolean>(false);
    const [scanning, setScanning] = useState<boolean>(false);
    const {autoScan} = useAutoRescan();
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);

    const router = useHistory();

    const findComputer = (serialNumber: string) => {
        ComputerService.findComputerBySerial(serialNumber)
            .then((computer) => {
                router.push(PATHS.LOANS.confirmIndividual, {
                    loan: {
                        ...loan,
                        computer: computer
                    },
                    comeFrom: router.location.pathname,
                })
                loan.student = {} as Student
            })
            .catch(() => {
                setOpen(true)
            })
            .finally(() => {
                setComputerSerial('')
                setScanning(false)
            })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await findComputer(computerSerial);
    }

    React.useEffect(() => {
        setComputerSerial(computerSerial.toUpperCase());
    }, [computerSerial])

    React.useEffect(() => {
        setScanning(autoScan);
    }, [autoScan])

    React.useEffect(() => {
        // Soumet automatiquement le formulaire si un code a été scanné
        if (autoSubmit) {
            setScanning(false);
            setAutoSubmit(false)
            Simulate.submit(document.querySelector('form') as HTMLFormElement)
        }
    }, [autoSubmit])

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container" onSubmit={handleSubmit} onKeyDown={submitOnEnter}>
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
                    <span className="scan-button">
                        <CodeScannerComponent
                            setComputerSerial={setComputerSerial}
                            scanning={scanning}
                            setScanning={setScanning}
                            setAutoSubmit={setAutoSubmit}
                        />
                    </span>
                </form>
            </IonContent>
            <UnknownComputerModalComponent
                open={open}
                setIsOpen={setOpen}
                onComputerAdd={() => {
                    router.push(PATHS.COMPUTERS.new, {
                        computer: {serialNumber: computerSerial},
                        comeFrom: router.location.pathname
                    });
                    setOpen(false);
                }
                }
                onCancel={() => {
                    setOpen(false);
                    setComputerSerial('');
                }}/>
        </IonPage>
    );
}

export default CreateIndividualLoanPage;