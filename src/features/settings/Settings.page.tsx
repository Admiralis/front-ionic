import React, {useContext} from 'react';
import {IonButton, IonContent, IonLoading, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent, LinuxButtonComponent} from "../../commons/components";
import styles from './Settings.module.css';
import {submitOnEnter} from "../../commons/utils";
import {ComputerConnectionStatusContext, CourseConnectionStatusContext, LoanConnectionStatusContext} from "../../App";
import useCheckApiConnection from "../../commons/hooks/connection/useCheckApiConnection";

function SettingsPage() {

    const {setLoanApiConnected} = useContext(LoanConnectionStatusContext);
    const {setCourseApiConnected} = useContext(CourseConnectionStatusContext);
    const {setComputerApiConnected} = useContext(ComputerConnectionStatusContext);

    const [ipInput, setIpInput] = React.useState<string>(localStorage.getItem('ip') || '');


    const {
        isComputerApiConnected: isComputerConnected,
        isLoanApiConnected: isLoanConnected,
        isCourseApiConnected: isCourseConnected,
        isLoading,
        ip,
        setIp
    } = useCheckApiConnection();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoanApiConnected(false);
        setCourseApiConnected(false);
        setComputerApiConnected(false);
        await testConnection();
    }

    async function testConnection() {
        try {
            setIp(ipInput);
            localStorage.setItem('ip', ip);
            setLoanApiConnected(isLoanConnected);
            setCourseApiConnected(isCourseConnected);
            setComputerApiConnected(isComputerConnected);
        } catch {
            setLoanApiConnected(false);
            setCourseApiConnected(false);
            setComputerApiConnected(false);
        }
    }

    React.useEffect(() => {

    }, [isComputerConnected, isLoanConnected, isCourseConnected])


    return (
        <IonPage>
            <IonContent>
                <form className='flex-container' onSubmit={handleSubmit} onKeyDown={submitOnEnter}>
                    <IonLoading message="Tentative de connection..." spinner="circles" isOpen={isLoading}
                                duration={5000}/>
                    <CardComponent
                        title='Statut'
                        content={
                            <>
                                <div className={styles.statusContainer}>
                                    {isComputerConnected && (
                                        <span>
                                            <LinuxButtonComponent/>
                                            <p>API computers</p>
                                        </span>
                                    )}
                                    {
                                        !isComputerConnected && (
                                            <span>
                                                <LinuxButtonComponent color={"red"}/>
                                                <p>API computers</p>
                                            </span>
                                        )
                                    }
                                    {isLoanConnected && (
                                        <span>
                                            <LinuxButtonComponent/>
                                            <p>API loans</p>
                                        </span>
                                    )}
                                    {!isLoanConnected && (
                                        <span>
                                            <LinuxButtonComponent color={"red"}/>
                                            <p>API loans</p>
                                        </span>
                                    )}
                                    {isCourseConnected && (
                                        <span>
                                            <LinuxButtonComponent/>
                                            <p>API courses</p>
                                        </span>
                                    )}
                                    {!isCourseConnected && (
                                        <span>
                                            <LinuxButtonComponent color={"red"}/>
                                            <p>API courses</p>
                                        </span>
                                    )}
                                </div>
                            </>
                        }
                    />
                    <CardComponent
                        title='Paramètres'
                        content={
                            <>
                                <p>Saisissez l'adresse du serveur</p>
                                <AsciiInputComponent
                                    label="IP"
                                    value={ipInput}
                                    onIonChange={(event) => {
                                        setIpInput(event.detail.value || '');
                                    }}
                                    placeholder='ex: 192.198.0.10'
                                />
                            </>
                        }
                        actions={
                            <IonButton
                                className='green large'
                                type="submit"
                                data-testid="button-submit"
                                disabled={ip === ''}
                            >
                                Valider
                            </IonButton>
                        }
                    />
                </form>
            </IonContent>
        </IonPage>
    );
}

export default SettingsPage;