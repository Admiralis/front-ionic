import {IonButton} from "@ionic/react";
import React from "react";

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
            path: "/scan/collectif",
            label: "Prêt collectif"
        },
        {
            path: "/scan/add",
            label: "Ajouter PC"
        },
        {
            path: "/scan/retour",
            label: "Retour au stock"
        },
        {
            path: "/scan/edit",
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