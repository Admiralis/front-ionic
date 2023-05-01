import {IonButton} from "@ionic/react";
import React from "react";
import * as APP_PATHS from "commons/constants/PATHS";

/**
 * Actions que peut faire l'utilisateur sur la page de menu
 * @return {JSX.Element}
 */
export const ScanMenuActionsComponent = () => {
    const paths = [
        {
            path: APP_PATHS.default.SCAN.newIndividualLoan,
            label: "Prêt individuel"
        },
        {
            path: APP_PATHS.default.SCAN.newCourse,
            label: "Prêt collectif"
        },
        {
            path: APP_PATHS.default.SCAN.newComputer,
            label: "Ajouter PC"
        },
        {
            path: APP_PATHS.default.SCAN.endLoan,
            label: "Retour stock"
        },
        {
            path: APP_PATHS.default.SCAN.editComputer,
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