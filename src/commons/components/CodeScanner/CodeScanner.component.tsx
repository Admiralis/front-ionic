import {useEffect, useState} from 'react';
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {IonButton, IonIcon, isPlatform} from "@ionic/react";
import {scan, scanCircle, scanCircleOutline} from "ionicons/icons";

interface CodeScannerComponentProps {
    setComputerSerial: (result: string) => void;
    setScanning: (scanning: boolean) => void;
    scanning: boolean;
}

const CodeScannerComponent = (props: CodeScannerComponentProps) => {

    const [scanResult, setScanResult] = useState<string>("");

    useEffect(() => {
        props.setComputerSerial(scanResult);
    }, [scanResult])

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
                setScanResult(result.content);
            }
        } else {
            await BarcodeScanner.openAppSettings();
        }
    };

    const stopScanning = async () => {
        const body = document.querySelector('body')
        body?.classList.remove('scanner-active');
        await BarcodeScanner.showBackground();
        await BarcodeScanner.stopScan();
        props.setScanning(false);
    }

    const checkAvailable = () => {
        if (isPlatform('mobileweb')) {
            return false;
        } else return isPlatform('android');
    }


    return (
        <div>
            {
                checkAvailable() && <>
                    {!props.scanning && <IonButton onClick={startScanning} className="green"><IonIcon
                        icon={scanCircleOutline}/></IonButton>}
                    {props.scanning && <IonButton onClick={stopScanning}>Stop</IonButton>}
                </>
            }
        </div>
    );
};

export default CodeScannerComponent;