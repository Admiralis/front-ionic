import React from 'react';
import {IonButton, IonContent, IonLoading, IonPage, IonToast} from "@ionic/react";
import {
    AsciiInputComponent,
    CardComponent,
    CodeScannerComponent,
    UnknownComputerModalComponent
} from "commons/components";
import {useHistory, useLocation} from "react-router";
import {isValidateButtonDisabled} from "commons/utils";
import {ComputerService} from "commons/services/computer";
import PATHS from "../../../commons/constants/PATHS";

const FindComputerPage = () => {

    const [computerSerial, setComputerSerial] = React.useState("" as string);
    const [scanning, setScanning] = React.useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [autoSubmit, setAutoSubmit] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const location = useLocation();
    const router = useHistory();
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [isError, setError] = React.useState<boolean>(false);

    React.useEffect(() => {
        // Met le numéro de série en toute majuscule
        // La double dépendance assure le bon rafraichissement des données
        computerSerial && setComputerSerial(computerSerial.toUpperCase());
    }, [computerSerial]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        try {
            const computer = await ComputerService.findComputerBySerial(computerSerial);
            if (location.pathname === PATHS.SCAN.editComputer) {
                router.push(
                    PATHS.COMPUTERS.edit + `${computerSerial}`,
                    {computer: computer, comeFrom: location.pathname}
                );
            } else if (location.pathname === PATHS.SCAN.endLoan) {
                router.push(
                    PATHS.LOANS.end + `${computerSerial}`,
                    {computer: computer, comeFrom: location.pathname}
                );
            }
        } catch (error) {
            setOpen(true)
        } finally {
            setComputerSerial("");
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonContent>
                <form onSubmit={(event) => handleSubmit(event)} className="flex-container">
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
                        comeFrom: location.pathname
                    });
                    setOpen(false);
                    setComputerSerial('');
                }}
                onCancel={() => {
                    setOpen(false);
                    setComputerSerial('');
                }}
                data-testid="unknown-computer-modal"
            />
            <IonLoading
                isOpen={isLoading}
                message={"Veuillez patienter ..."}
                duration={3000}
                spinner="circles"
            />
            <IonToast
                isOpen={isError}
                message={"Une erreur est survenue. Vérifiez la connection au serveur"}
                duration={3000}
                onDidDismiss={() => setError(false)}
                color="danger"
                position="middle"
            />
        </IonPage>
    );
};

export default FindComputerPage;