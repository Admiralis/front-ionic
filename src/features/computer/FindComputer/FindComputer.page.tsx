import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent, CodeScannerComponent} from "commons/components";
import SimpleModalComponent from "commons/components/Modals/SimpleModal/SimpleModal.component";
import {useHistory, useLocation} from "react-router";
import {isValidateButtonDisabled, submitOnEnter} from "commons/utils";
import {ComputerService} from "commons/services/computer";


const FindComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const location = useLocation<{ newComputerSerial: string, comeFrom: string }>();
    const router = useHistory();

    useEffect(() => {
        // Met le numéro de série en toute majuscule
        // La double dépendance assure le bon rafraichissement des données
        computerSerial && setComputerSerial(computerSerial.toUpperCase());
    }, [computerSerial]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ComputerService.findComputerBySerial(computerSerial).then((computer) => {
            router.push(
                `/scan/edit/${computerSerial}`,
                {newComputerState: computer, comeFrom: location.pathname}
            );
            setComputerSerial('');
        }).catch(() => {
            setOpen(true)
        })
    };

    return (
        <IonPage>
            <IonContent>
                <form onSubmit={handleSubmit} className="flex-container" onKeyDown={submitOnEnter}>
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
            <SimpleModalComponent
                isOpen={open}
                setIsOpen={setOpen}
                content={<p>Ce PC n'existe pas !</p>}
                title={<p>¯\_(ツ)_/¯</p>}
                actions={
                    <>
                        <IonButton
                            onClick={
                                () => {
                                    router.push('/scan/add/confirm', {
                                        newComputerState: {serial: computerSerial},
                                        comeFrom: location.pathname
                                    });
                                    setOpen(false);
                                    setComputerSerial('');
                                }
                            }
                            className="green"
                        >
                            Ajouter
                        </IonButton>
                        <IonButton
                            onClick={
                                () => {
                                    setOpen(false);
                                    setComputerSerial('');
                                }
                            }
                            className="yellow"
                        >
                            Igonrer
                        </IonButton>
                    </>

                }
            />
        </IonPage>
    );
};

export default FindComputerPage;