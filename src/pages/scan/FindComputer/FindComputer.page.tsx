import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent, CodeScannerComponent} from "commons/components";
import useComputer from "commons/hooks/computers/useComputer";
import SimpleModalComponent from "../AddComputer/AlreadyExistsModal/SimpleModal.component";
import {useHistory, useLocation} from "react-router";
import {isValidateButtonDisabled} from "commons/utils";


const FindComputerPage = () => {

    const [computerSerial, setComputerSerial] = useState("" as string);
    const [scanning, setScanning] = useState<boolean>(false);
    const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState("" as string);

    const {computer, isLoading, error} = useComputer(computerSerial);
    const location = useLocation<{newComputerSerial: string, comeFrom: string }>();
    const router = useHistory();

    useEffect(() => {
        // Met le numéro de série en toute majuscule
        // La double dépendance assure le bon rafraichissement des données
        search && setSearch(search.toUpperCase());
    }, [search]);

    useEffect(() => {
        setSearch('');
        setComputerSerial('');
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setComputerSerial(search);
        setSearch('')
        if (!computer) {
            setOpen(true);
        }
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
                                value={search}
                                label="SerialNumber"
                                onIonChange={e => {
                                    setSearch(e.detail.value!);
                                }}
                            />
                        </>
                        }
                        actions={
                            <IonButton
                                className="green"
                                type="submit"
                                disabled={isValidateButtonDisabled(search, 7)}
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
                                    router.push('/scan/add/confirm', {newComputerState: {serial: computerSerial}, comeFrom: location.pathname });
                                    setOpen(false);
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
                                    setSearch('');
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