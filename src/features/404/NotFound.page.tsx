import React from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "../../commons/components";
import {useHistory} from "react-router";

function NotFoundPage() {

    const router = useHistory();

    return (
        <IonPage>
            <IonContent>
                <div className='flex-container'>
                    <CardComponent
                        title='404'
                        content={
                            <>
                                <p>¯\_(ツ)_/¯</p>
                                <p>Tu t'es perdu ?</p>
                            </>
                        }
                        actions={
                            <IonButton className='green large' onClick={() => router.push('/')}>Retour à l'accueil</IonButton>
                        }
                    />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default NotFoundPage;