import React, {useEffect, useRef, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {
    AsciiInputComponent,
    CardComponent,
    CodeScannerComponent,
    UnknownComputerModalComponent
} from "commons/components";
import SimpleModalComponent from "commons/components/Modals/SimpleModal/SimpleModal.component";
import {useHistory, useLocation} from "react-router";
import {isValidateButtonDisabled, submitOnEnter} from "commons/utils";
import {ComputerService} from "commons/services/computer";
import PATHS from "../../../commons/constants/PATHS";

const FindComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const location = useLocation();
    const router = useHistory();

    useEffect(() => {
        // Met le numéro de série en toute majuscule
        // La double dépendance assure le bon rafraichissement des données
        computerSerial && setComputerSerial(computerSerial.toUpperCase());
    }, [computerSerial]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ComputerService.findComputerBySerial(computerSerial).then((computer) => {
            if (location.pathname === PATHS.SCAN.editComputer) {
                router.push(
                    PATHS.COMPUTERS.edit + `${computerSerial}`,
                    {computer: computer, comeFrom: location.pathname}
                );
            } else if (location.pathname === PATHS.SCAN.endLoan ) {
                router.push(
                     PATHS.LOANS.end + `${computerSerial}`,
                    {computer: computer, comeFrom: location.pathname}
                );
            }
            setComputerSerial('');
        }).catch(() => {
            setOpen(true)
        })
    };

    return (
        <IonPage>
            <IonContent>
                <form onSubmit={handleSubmit} className="flex-container">
                    <CardComponent
                        title="Scannez le PC"
                        content={
                            <>
                                <p>Ou tapez son numéro de série</p>
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
                                disabled={isValidateButtonDisabled(computerSerial, 7)}
                            >
                                Valider
                            </IonButton>}
                    />
                </form>
                <CodeScannerComponent
                    setComputerSerial={setComputerSerial}
                    scanning={scanning}
                    setScanning={setScanning}
                    setAutoSubmit={setAutoSubmit}
                />
            </IonContent>
            <UnknownComputerModalComponent
                open={open}
                setIsOpen={setOpen}
                onComputerAdd={() => {
                    router.push(PATHS.COMPUTERS.new, {
                        computer: {serialNumber: computerSerial},
                        comeFrom: location.pathname
                    });
                    setOpen(false);
                    setComputerSerial('');
                }}
                onCancel={() => {
                    setOpen(false);
                    setComputerSerial('');
                }}
            />
        </IonPage>
    );
};

export default FindComputerPage;