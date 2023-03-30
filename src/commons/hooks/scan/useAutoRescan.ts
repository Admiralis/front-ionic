import {useEffect, useState} from "react";
import {isPlatform} from "@ionic/react";
import {useLocation} from "react-router";

/**
 * Hook pour gérer l'ouverture automatique de la caméra
 * S'ouvre automatiquement si on vient de la page de confirmation et que l'on est sur un appareil android
 */
const useAutoRescan = () => {

    const location = useLocation<{ reScan: boolean }>();
    const [autoScan, setAutoScan] = useState<boolean>(false);

    useEffect(() => {
        // Prévient les erreurs lors des changements de page
        if (!location.state) {
            return;
        }
        if (isPlatform('mobileweb')) {
            return;
        }
        // Ouvre automatiquement la caméra si on vient de la page de confirmation
        if (isPlatform('android') && location.state.reScan) {
            setAutoScan(true);
        }
    }, [location.state]);

    return {autoScan}
}

export default useAutoRescan;