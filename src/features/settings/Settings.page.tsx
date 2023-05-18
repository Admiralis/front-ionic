import React from 'react';
import {IonButton, IonContent, IonLoading, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent, LinuxButtonComponent} from "../../commons/components";
import styles from './Settings.module.css';
import {submitOnEnter} from "../../commons/utils";

function SettingsPage() {

    const [ip, setIp] = React.useState<string>(localStorage.getItem('ip') || '');
    const [loanStatus, setLoanStatus] = React.useState<boolean>(false);
    const [courseStatus, setCourseStatus] = React.useState<boolean>(false);
    const [computerStatus, setComputerStatus] = React.useState<boolean>(false);
    const [isLoading, setLoading] = React.useState<boolean>(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        localStorage.setItem('ip', ip);
        testConnection();
    }

    function testConnection() {

        setLoading(true);
        setLoanStatus(false);
        setCourseStatus(false);
        setComputerStatus(false);

        fetch(`http://${ip}/api/loans/status/health`).then((response) => {
            if (response.status === 200) {
                setLoanStatus(true);
                setLoading(false)
            } else {
                setLoanStatus(false);
                setLoading(false)
            }
        }).catch((error) => {
            console.error(error);
            setLoanStatus(false);
            setLoading(false)
        });

        fetch(`http://${ip}/api/courses/status/health`).then((response) => {
            if (response.status === 200) {
                setCourseStatus(true);
                setLoading(false)
            } else {
                setLoanStatus(false);
                setLoading(false)
            }
        }).catch((error) => {
            console.error(error);
            setCourseStatus(false);
            setLoading(false)
        });

        fetch(`http://${ip}/api/computers/status/health`).then((response) => {
            if (response.status === 200) {
                setComputerStatus(true);
                setLoading(false)
            } else {
                setLoanStatus(false);
                setLoading(false)
            }
        }).catch((error) => {
            console.error(error);
            setComputerStatus(false);
            setLoading(false)
        });
    }

    React.useEffect(() => {
        localStorage.getItem('ip') && setIp(localStorage.getItem('ip') as string);
        testConnection();
    }, [localStorage])

    React.useEffect(() => {

    }, [loanStatus, courseStatus, computerStatus])

    return (
        <IonPage>
            <IonContent>
                <form className='flex-container' onSubmit={handleSubmit} onKeyDown={submitOnEnter}>
                    <IonLoading message="Tentative de connection..." spinner="circles" isOpen={isLoading} duration={5000} />
                    <CardComponent
                        title='Statut'
                        content={
                            <>
                                <div className={styles.statusContainer}>
                                    {computerStatus && (
                                        <span>
                                            <LinuxButtonComponent/>
                                            <p>API computers</p>
                                        </span>
                                    )}
                                    {
                                        !computerStatus && (
                                            <span>
                                                <LinuxButtonComponent color={"red"}/>
                                                <p>API computers</p>
                                            </span>
                                        )
                                    }
                                    {loanStatus && (
                                        <span>
                                            <LinuxButtonComponent/>
                                            <p>API loans</p>
                                        </span>
                                    )}
                                    {!loanStatus && (
                                        <span>
                                            <LinuxButtonComponent color={"red"}/>
                                            <p>API loans</p>
                                        </span>
                                    )}
                                    {courseStatus && (
                                        <span>
                                            <LinuxButtonComponent/>
                                            <p>API courses</p>
                                        </span>
                                    )}
                                    {!courseStatus && (
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
                                    value={ip}
                                    onIonChange={(event) => {
                                        setIp(event.detail.value || '');
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