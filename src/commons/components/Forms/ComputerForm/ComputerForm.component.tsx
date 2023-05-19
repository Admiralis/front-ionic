import {NewComputer} from "commons/models";
import {AsciiInputComponent} from "commons/components";
import React from "react";
import {Computer} from "../../../models";

interface ComputerFormComponentProps {
    newComputerInfo: NewComputer | Computer;
    setNewComputerInfo: (newComputerInfo: NewComputer | Computer) => void;
}

export const ComputerFormComponent = (props: ComputerFormComponentProps) => {
    return (
        <>
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