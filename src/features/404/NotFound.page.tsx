import React from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "../../commons/components";

function NotFoundPage() {
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
                            <IonButton className='green large' routerLink="/">Retour à l'accueil</IonButton>
                        }
                    />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default NotFoundPage;