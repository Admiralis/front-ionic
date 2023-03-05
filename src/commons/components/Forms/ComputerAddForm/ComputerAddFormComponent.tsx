import React from "react";
import './ComputerAddForm.component.css'
import {HorizontalDividerComponent, AsciiInputComponent} from "commons/components";
import {NewComputer} from "commons/models";

interface ComputerAddFormComponentProps {
    computerSerial: string;
    setComputerSerial: (computerSerial: string) => void;

    newComputerInfo: NewComputer;

    setNewComputerInfo: (newComputerInfo: NewComputer) => void;

}

export const ComputerAddFormComponent = (props: ComputerAddFormComponentProps) => {

    return (
        <>
            <div className="container">
                <p>
                    Remplissez le formulaire et scannez le PC
                </p>
                <AsciiInputComponent label="Catégorie" value={props.newComputerInfo.computerCategory || ""}
                                     onIonChange={(e: any) => {

                                         props.setNewComputerInfo({
                                             ...props.newComputerInfo,
                                             computerCategory: e.detail.value!
                                         })
                                     }}
                />
                <AsciiInputComponent label="RAM" value={props.newComputerInfo.computerRam || ""}
                                     onIonChange={(e: any) => {
                                         props.setNewComputerInfo({
                                             ...props.newComputerInfo,
                                             computerRam: e.detail.value!
                                         })
                                     }}
                />
                <AsciiInputComponent label="Processeur" value={props.newComputerInfo.computerCpu || ""}
                                     onIonChange={(e: any) => {
                                         props.setNewComputerInfo({
                                             ...props.newComputerInfo,
                                             computerCpu: e.detail.value!
                                         })
                                     }}
                />
                <AsciiInputComponent label="Etat" value={props.newComputerInfo.computerCondition || ""}
                                     onIonChange={(e: any) => {
                                         props.setNewComputerInfo({
                                             ...props.newComputerInfo,
                                             computerCondition: e.detail.value!
                                         })
                                     }}
                />
                <HorizontalDividerComponent/>
                <AsciiInputComponent
                    value={props.computerSerial}
                    label="SerialNumber"
                    onIonChange={e => {
                        props.setComputerSerial(e.detail.value!)
                        props.setNewComputerInfo({
                            ...props.newComputerInfo,
                            computerSerial: e.detail.value!
                        })
                    }}
                />
            </div>
        </>
    )
};