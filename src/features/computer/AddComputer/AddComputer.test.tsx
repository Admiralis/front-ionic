import React, {useState as useStateMock} from 'react';
import {act, render, renderHook, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import AddComputerPage from "./AddComputer.page";
import useAutoRescan from "../../../commons/hooks/scan/useAutoRescan";
import {useLocation} from "react-router";
import {isPlatform} from "@ionic/react";
import {NewComputer} from "../../../commons/models";

// const AddComputerPage = () => {
//
//     const [computerSerial, setComputerSerial] = useState("" as string);
//     const [scanning, setScanning] = useState<boolean>(false);
//     const [newComputerInfo, setNewComputerInfo] = useState<NewComputer>({} as NewComputer);
//     const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
//     const [open, setOpen] = useState<boolean>(false);
//
//     const {autoScan} = useAutoRescan();
//     const history = useHistory();
//     const location = useLocation<{serialNumber: string, comeFrom: string }>();
//
//
//     useEffect(() => {
//         if (location.state) {
//             setComputerSerial(location.state.serialNumber);
//         }
//     }, [location.state])
//
//     useEffect(() => {
//         setScanning(autoScan);
//     }, [autoScan])
//
//     useEffect(() => {
//         // Met le numéro de série en toute majuscule
//         // La double dépendance assure le bon rafraichissement des données
//         computerSerial && setComputerSerial(computerSerial.toUpperCase());
//     }, [computerSerial, newComputerInfo]);
//
//     useEffect(() => {
//         // Soumet automatiquement le formulaire si un code a été scanné
//         if (autoSubmit) {
//             Simulate.submit(document.querySelector('form') as HTMLFormElement)
//             setScanning(false);
//             setAutoSubmit(false)
//         }
//     }, [autoSubmit])
//
//     /**
//      * Vérifie si l'ordinateur existe
//      * Si oui, ouvre la modale
//      * Sinon, redirige vers la page de confirmation
//      */
//     const checkIfExistsAndSend = (): void => {
//         ComputerService.computerExistsBySerial(computerSerial).then((computerExists) => {
//             if (computerExists) {
//                 openDialogAndReset();
//             } else {
//                 goNextStep();
//             }
//         });
//     }
//
//     /**
//      * Ouvre la modale et reset le champ "Serial Number"
//      */
//     function openDialogAndReset() {
//         setComputerSerial('');
//         setOpen(true);
//     }
//
//     /**
//      * Redirige vers la page de confirmation
//      */
//     function goNextStep() {
//         newComputerInfo.serialNumber = computerSerial;
//         history.push(PATHS.COMPUTERS.new, {computer: newComputerInfo, comeFrom: location.pathname});
//         setComputerSerial('');
//     }
//
//     /**
//      * Soumet le formulaire et reset le champ "Serial Number"
//      * Redirige vers la page de confirmation
//      * @param e
//      */
//     const handleSubmit = (e: any) => {
//         e.preventDefault();
//         checkIfExistsAndSend();
//     }
//
//     return (
//         <IonPage>
//             <IonContent onKeyDown={submitOnEnter}>
//                 <form className="flex-container" onSubmit={handleSubmit} onKeyDown={submitOnEnter}>
//                     <CardComponent
//                         title={"Ajouter un PC"}
//                         content={
//                             <ComputerAddFormComponent
//                                 computerSerial={computerSerial}
//                                 setComputerSerial={setComputerSerial}
//                                 newComputerInfo={newComputerInfo}
//                                 setNewComputerInfo={setNewComputerInfo}
//                             />
//                         }
//                         actions={
//                             <IonButton className="green" type="submit" disabled={isValidateButtonDisabled(computerSerial, 7)}>
//                                 Ajouter PC
//                             </IonButton>
//                         }
//                     />
//                     <span className="scan-button">
//
//                     <CodeScannerComponent
//                         setComputerSerial={setComputerSerial}
//                         scanning={scanning}
//                         setScanning={setScanning}
//                         setAutoSubmit={setAutoSubmit}
//                     />
//                     </span>
//                 </form>
//             </IonContent>
//             <SimpleModalComponent isOpen={open} setIsOpen={setOpen} content={<p>Le PC existe déjà</p>} title={<p>Ooops !</p>}/>
//         </IonPage>
//     );
// };


// const useAutoRescan = () => {
//
//     const location = useLocation<{ reScan: boolean }>();
//     const [autoScan, setAutoScan] = useState<boolean>(false);
//
//     useEffect(() => {
//         // Prévient les erreurs lors des changements de page
//         if (!location.state) {
//             return;
//         }
//         if (isPlatform('mobileweb')) {
//             return;
//         }
//         // Ouvre automatiquement la caméra si on vient de la page de confirmation
//         if (isPlatform('android') && location.state.reScan) {
//             setAutoScan(true);
//         }
//     }, [location.state]);
//
//     return {autoScan}
// }


// jest.mock('commons/hooks/scan/useAutoRescan', () => ({
//     __esModule: true,
//     useAutoRescan: {
//         default: jest.fn(() => false)
//     }
// }));

// jest.mock('commons/hooks/scan/useAutoRescan', () => ({
//     __esModule: true,
//     default: jest.fn(() => {
//         return {
//             autoScan: false
//         }
//     })
// }));

// jest.mock('commons/hooks/scan/useAutoRescan');

// jest.mock('react-router', () => ({
//     useHistory: jest.fn(() => ({
//         push: jest.fn()
//     })),
//     useLocation: jest.fn(() => ({
//         state: {reScan: false}
//     }))
// }));
describe('AddComputerPage', () => {

    let useLocation: jest.SpyInstance;
    let useAutoRescan: jest.SpyInstance;
    const newComputerInfoMock: NewComputer = {
        category: 'Laptop',
        comments: [],
        condition: 'Good',
        processor: 'i5',
        ram: '8',
        serialNumber: '1234567',
    }
    jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useState: jest.fn()
    }))

    beforeEach(() => {
        mockIonicReact();
        useAutoRescan = jest.spyOn(require('commons/hooks/scan/useAutoRescan'), 'default');
        useAutoRescan.mockReturnValue({autoScan: false});
        useLocation = jest.spyOn(require('react-router'), 'useLocation');
        useLocation.mockReturnValue({state: {reScan: false}});
    });

    it('should render without autoScan', async () => {
        const {container} = await render(<AddComputerPage/>);
        await waitForIonicReact()
        expect(container).toBeDefined();
    });

    it('should render with autoScan', async () => {
        const {container} = await render(<AddComputerPage/>);
        await waitForIonicReact()
        expect(container).toBeDefined();
    });

    it('should not be submitable if serial number is empty', async () => {
        await render(<AddComputerPage/>);
        await waitForIonicReact()
        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeDisabled();
    });

});