import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import './Card.component.css';

interface CardProps {
    title: string;
    content: string;
    children: React.ReactNode;
}

const CardComponent = (props: CardProps) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{props.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {props.content}
                <div>
                    {props.children}
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default CardComponent;