import React from 'react';
import {IonButton, IonContent, IonLoading, IonPage} from "@ionic/react";
import {AsciiInputComponent, CardComponent, LinuxButtonComponent} from "../../commons/components";
import styles from './Settings.module.css';
import {submitOnEnter} from "../../commons/utils";
import useCheckApiConnection from "../../commons/hooks/connection/useCheckApiConnection";
import useStorage from "../../commons/hooks/storage/useStorage";

function SettingsPage() {

    const {storage} = useStorage();

    const {
        isConnected,
        isLoading,
        setIp,
        ip
    } = useCheckApiConnection();

    const [ipInput, setIpInput] = React.useState<string>(ip ||'');

    React.useEffect(() => {
        storage.get('ip').then((ip) => {
            setIpInput(ip || '')
        })
    }, [])



    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIp(ipInput)
    }


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
                                    {isConnected && (
                                        <span>
                                            <LinuxButtonComponent/>
                                            <p>API</p>
                                        </span>
                                    )}
                                    {!isConnected && (
                                        <span>
                                            <LinuxButtonComponent color={"red"}/>
                                            <p>API</p>
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
                                disabled={ipInput === ''}
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