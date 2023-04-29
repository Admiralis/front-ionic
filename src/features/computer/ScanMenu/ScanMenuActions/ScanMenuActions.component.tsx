import {IonButton} from "@ionic/react";
import React from "react";
import * as appPaths from "commons/constants/paths";

/**
 * Actions que peut faire l'utilisateur sur la page de menu
 * @return {JSX.Element}
 */
export const ScanMenuActionsComponent = () => {
    const paths = [
        {
            path: "/scan/individuel",
            label: "Prêt individuel"
        },
        {
            path: appPaths.default.scan.newCourse,
            label: "Prêt collectif"
        },
        {
            path: appPaths.default.scan.newComputer,
            label: "Ajouter PC"
        },
        {
            path: appPaths.default.scan.endLoan,
            label: "Retour stock"
        },
        {
            path: appPaths.default.scan.editComputer,
            label: "Editer PC"
        },
        {
            path: "/scan/autre",
            label: "¯\\_(ツ)_/¯"
        }
    ]
    return (
        <>
            {
                paths.map((path, index) => {
                    return <IonButton key={index} routerLink={path.path} className="medium green"
                                      routerDirection="forward">{path.label}</IonButton>
                })
            }
        </>
    );
}