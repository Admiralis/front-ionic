import React, {useEffect} from 'react';
import {act, fireEvent, render, renderHook, screen} from '@testing-library/react';

import CodeScannerComponent from "./CodeScanner.component";
import {ionFireEvent, mockIonicReact, waitForIonicReact} from "@ionic/react-test-utils";
import * as IonicReact from "@ionic/react";
import * as IonicCore from '@ionic/core';

// const CodeScannerComponent = (props: CodeScannerComponentProps) => {
//
//     useEffect(() => {
//         // Si true, on ouvre la caméra (Android uniquement)
//         if (isPlatform('android') && props.scanning) {
//             startScanning();
//         }
//     }, [props.scanning])
//
//     /**
//      * Scan le code-barre et affecte le résultat au state computerSerial du parent
//      */
//     const startScanning = async () => {
//         const body = document.querySelector('body')
//         body?.classList.add('scanner-active');
//         props.setScanning(true);
//         const allowed = await BarcodeScanner.checkPermission({force: true});
//         if (allowed.granted) {
//             await BarcodeScanner.hideBackground();
//             const result = await BarcodeScanner.startScan();
//             if (result.hasContent && result.content) {
//                 await stopScanning();
//                 props.setComputerSerial(result.content);
//                 setTimeout(() => {
//                     props.setAutoSubmit(true);
//                 }, 1000);
//             }
//         } else {
//             await BarcodeScanner.openAppSettings();
//         }
//     };
//
//     /**
//      * Arrête le scan et réaffiche le fond de l'application
//      */
//     const stopScanning = async () => {
//         const body = document.querySelector('body')
//         body?.classList.remove('scanner-active');
//         await BarcodeScanner.showBackground();
//         await BarcodeScanner.stopScan();
//         props.setScanning(false);
//     }
//
//     /**
//      * Vérifie si la plateforme est Android
//      */
//     const checkAvailable = () => {
//
//         if (isPlatform('mobileweb')) {
//             return false;
//         } else return isPlatform('android');
//     }
//
//
//     return (
//         <div>
//             {
//                 checkAvailable() && <>
//                     {!props.scanning && <IonButton onClick={startScanning} className="green"><IonIcon
//                         icon={scanCircleOutline}/></IonButton>}
//                     {props.scanning && <IonButton onClick={stopScanning}>Stop</IonButton>}
//                 </>
//             }
//         </div>
//     );
// };
//
// export default CodeScannerComponent;

describe('CodeScannerComponent', () => {

    const props: any = {
        setComputerSerial: jest.fn(),
        setSanning: jest.fn(),
        scanning: false,
        setAutoSubmit: jest.fn(),
    }

    let isPlatform: any;
    let mockIsPlatform: (key: string) => boolean;

    beforeEach(() => {
        mockIonicReact();
    })

    it('should render successfully', async () => {
        const {container} = render(<CodeScannerComponent {...props}  />);
        await waitForIonicReact()
        expect(container).toBeTruthy();
    });

    it('should not display the button if the platform is not android', async () => {
        mockIsPlatform = jest.fn().mockReturnValue(false);
        isPlatform = jest.spyOn(IonicReact, 'isPlatform').mockImplementation(mockIsPlatform);
        const {container} = render(<CodeScannerComponent {...props}  />);
        await waitForIonicReact()
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        expect(container.querySelector('ion-button')).toBeFalsy();
    });
});