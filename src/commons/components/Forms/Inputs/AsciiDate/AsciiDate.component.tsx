import React from "react";
import {AsciiInputComponent} from "../AsciiInput/AsciiInput.component";
import {IonButton, IonButtons, IonDatetime, IonIcon} from "@ionic/react";
import {calendar} from "ionicons/icons";
import SimpleModalComponent from "../../../Modals/SimpleModal/SimpleModal.component";

interface AsciiDatePickerComponentProps {
    label: string
    value: Date | null
    onChange: (e: any) => void
    required?: boolean
    min?: string
    max?: string
}

/**
 * Composant de sélection de date au format ASCII
 * Fait apparaitre un input ascii et un bouton de sélection de date
 * @param props - label : string : label du champ
 * @param props - value : Date : date sélectionnée
 * @param props - onChange : (e: any) => void : fonction de mise à jour de la date sélectionnée
 * @param props - required : boolean : indique si le champ est obligatoire // False si non renseigné
 * @param props (facultatif) - min : string : date minimale de sélection
 * @param props (facultatif) - max : string : date maximale de sélection
 */
export const AsciiDatePickerComponent = (props: AsciiDatePickerComponentProps) => {

    const [isDatePickerOpen, setDatePickerOpen] = React.useState<boolean>(false)

    const {label, value, onChange, required, min, max} = props

    return (
        <>
            <span
                style={{width: '100%', marginLeft: '5%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <AsciiInputComponent label={label}
                                 value={value?.toLocaleDateString() || ''}
                                 required={required}
            />
                <IonButtons>
                    <IonButton onClick={() => setDatePickerOpen(true)} className="icon" icon-only >
                        <IonIcon icon={calendar}></IonIcon>
                    </IonButton>
                </IonButtons>
            </span>
            <span className="flex-container">
                <SimpleModalComponent
                    isOpen={isDatePickerOpen}
                    setIsOpen={setDatePickerOpen}
                    title={label}
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
                                     style={{width: '80%'}}
                                     min={min || undefined}
                                     max={max || undefined}
                        />
                    }
                />
            </span>
        </>
    );
};