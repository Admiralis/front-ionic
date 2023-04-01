import React, {useEffect, useState} from "react";
import {AsciiInputComponent} from "../../../../Forms/Inputs/AsciiInput/AsciiInput.component";
import {IonButton, IonButtons, IonDatetime, IonIcon} from "@ionic/react";
import {calendar} from "ionicons/icons";
import SimpleModalComponent from "../../../../Modals/SimpleModal/SimpleModal.component";

interface AsciiDatePickerComponentProps {
    label: string
    value: Date | null
    onChange: (e: any) => void
    required?: boolean
}

export const AsciiDatePickerComponent = (props: AsciiDatePickerComponentProps) => {

    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false)

    const {label, value, onChange, required} = props

    useEffect(() => {
        setDatePickerOpen(false)
    }, [onChange])

    return (
        <>
            <span
                style={{width: '100%', marginLeft: '5%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <AsciiInputComponent label={label}
                                 value={value?.toLocaleDateString() || ''}
                                 required={required}
            />
                <IonButtons>
                    <IonButton onClick={() => setDatePickerOpen(true)}>
                        <IonIcon icon={calendar}></IonIcon>
                    </IonButton>
                </IonButtons>
            </span>
            <span className="flex-container">
                <SimpleModalComponent
                    isOpen={isDatePickerOpen}
                    setIsOpen={setDatePickerOpen}
                    title="Date de début"
                    height="35%"
                    content={
                        <IonDatetime id="date"
                                     presentation="date"
                                     preferWheel={true}
                                     value={value?.toISOString() || new Date().toISOString()}
                                     onIonChange={onChange}
                                     showDefaultButtons={true}
                                     locale="fr-FR"
                                     size="cover"
                                     doneText="Valider"
                                     cancelText="Annuler"
                        />
                    }
                />
            </span>
        </>
    );
};