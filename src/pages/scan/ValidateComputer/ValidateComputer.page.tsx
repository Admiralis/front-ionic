import React, {useEffect, useState} from 'react';
import {IonContent, IonPage} from "@ionic/react";
import {CardComponent} from "../../../commons/components";
import {useLocation} from "react-router";
import {NewComputer} from "../../../commons/models";

const ValidateComputerPage = () => {

    const location = useLocation<{newComputerInfo: NewComputer}>();

    const [computerSerial, setComputerSerial] = useState(location.state.newComputerInfo.computerSerial as string);
    const [newComputerInfo, setNewComputerInfo] = useState(location.state.newComputerInfo as NewComputer);

    return (
        <div>
            <IonPage>
                <IonContent>
                    <CardComponent title="Valider un PC"/>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default ValidateComputerPage;