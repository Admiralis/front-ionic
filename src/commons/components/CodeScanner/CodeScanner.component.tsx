import {useEffect} from 'react';
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {IonButton, IonIcon, isPlatform} from "@ionic/react";
import {scanCircleOutline} from "ionicons/icons";

interface CodeScannerComponentProps {
    setComputerSerial: (result: string) => void;
    setScanning: (scanning: boolean) => void;
    scanning: boolean;
    setAutoSubmit: (autoSubmit: boolean) => void;
}

/**
 * Composant permettant de scanner un code-barre d'ordinateur. Ne fonctionne QUE sur Android
 * @param props.setComputerSerial Fonction permettant de mettre à jour le state computerSerial du parent
 * @param props.setScanning Fonction permettant de mettre à jour le state scanning du parent. True si la caméra est ouverte, false sinon
 * @param props.scanning True si la caméra est ouverte, false sinon
 * @param props.setAutoSubmit Fonction permettant de mettre à jour le state autoSubmit du parent. True si le formulaire doit être soumis automatiquement, false sinon. Sera utilisé pour soumettre automatiquement le formulaire après le scan
 * @constructor
 */
const CodeScannerComponent = (props: CodeScannerComponentProps) => {

    useEffect(() => {
        // // Si true, on ouvre la caméra (Android uniquement)
        // if (isPlatform('android') && props.scanning) {
        //     startScanning();
        // }

        (async () => {
            if (isPlatform('android')) {
                await startScanning();
            }
        })()

        // (async () => {
        //     const allowed = await BarcodeScanner.checkPermission({force: true});
        //     if (allowed.granted) {
        //         await BarcodeScanner.hideBackground();
        //     }
        // })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.scanning])

    /**
     * Scan le code-barre et affecte le résultat au state computerSerial du parent
     */
    const startScanning = async () => {
        const body = document.querySelector('body')
        body?.classList.add('scanner-active');
        props.setScanning(true);
        const allowed = await BarcodeScanner.checkPermission({force: true});
        if (allowed.granted) {
            await BarcodeScanner.hideBackground();
            const result = await BarcodeScanner.startScan();
            if (result.hasContent && result.content) {
                await stopScanning();
                props.setComputerSerial(result.content);
                setTimeout(() => {
                props.setAutoSubmit(true);
                }, 1000);
            }
        } else {
            await BarcodeScanner.openAppSettings();
        }
    };

    /**
     * Arrête le scan et réaffiche le fond de l'application
     */
    const stopScanning = async () => {
        const body = document.querySelector('body')
        body?.classList.remove('scanner-active');
        await BarcodeScanner.showBackground();
        await BarcodeScanner.stopScan();
        props.setScanning(false);
    }

    /**
     * Vérifie si la plateforme est Android
     */
    const checkAvailable = () => {

        if (isPlatform('mobileweb')) {
            return false;
        } else return isPlatform('android');
    }


    return (
        <div>
            {
                checkAvailable() && <>
                    {!props.scanning && <IonButton onClick={startScanning} className="green" data-testid='start-button'><IonIcon
                        icon={scanCircleOutline}/></IonButton>}
                    {props.scanning && <IonButton onClick={stopScanning}>Stop</IonButton>}
                </>
            }
        </div>
    );
};

export default CodeScannerComponent;