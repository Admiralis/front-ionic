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
        </>
    )
};