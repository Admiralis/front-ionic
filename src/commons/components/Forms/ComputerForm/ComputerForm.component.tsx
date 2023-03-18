import {NewComputer} from "../../../models";
import {AsciiInputComponent} from "../../index";
import React from "react";

interface ComputerFormComponentProps {
    newComputerInfo: NewComputer
    setNewComputerInfo: (newComputerInfo: NewComputer) => void;
}

export const ComputerFormComponent = (props: ComputerFormComponentProps) => {
    return (
        <>
            <AsciiInputComponent label="Catégorie" value={props.newComputerInfo.category || ""}
                                 onIonChange={(e: any) => {

                                     props.setNewComputerInfo({
                                         ...props.newComputerInfo,
                                         category: e.detail.value!
                                     })
                                 }}
            />
            <AsciiInputComponent label="RAM" value={props.newComputerInfo.ram || ""}
                                 onIonChange={(e: any) => {
                                     props.setNewComputerInfo({
                                         ...props.newComputerInfo,
                                         ram: e.detail.value!
                                     })
                                 }}
            />
            <AsciiInputComponent label="Processeur" value={props.newComputerInfo.processor || ""}
                                 onIonChange={(e: any) => {
                                     props.setNewComputerInfo({
                                         ...props.newComputerInfo,
                                         processor: e.detail.value!
                                     })
                                 }}
            />
            <AsciiInputComponent label="Etat" value={props.newComputerInfo.condition || ""}
                                 onIonChange={(e: any) => {
                                     props.setNewComputerInfo({
                                         ...props.newComputerInfo,
                                         condition: e.detail.value!
                                     })
                                 }}
            />
        </>
    )
};