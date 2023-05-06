import React from 'react';
import {act, fireEvent, render, renderHook, screen} from '@testing-library/react';
import FindComputerPage from "./FindComputer.page";
import {ionFireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {useHistory, useLocation} from "react-router";
import {ComputerService} from "../../../commons/services/computer";
import * as ReactRouter from "react-router";
import {Computer} from "../../../commons/models";


// const FindComputerPage = () => {
//
//     const [computerSerial, setComputerSerial] = React.useState("" as string);
//     const [scanning, setScanning] = React.useState<boolean>(false);
//     const [autoSubmit, setAutoSubmit] = React.useState<boolean>(false);
//     const [open, setOpen] = React.useState<boolean>(false);
//     const location = useLocation();
//     const router = useHistory();
//
//     React.useEffect(() => {
//         // Met le numéro de série en toute majuscule
//         // La double dépendance assure le bon rafraichissement des données
//         computerSerial && setComputerSerial(computerSerial.toUpperCase());
//     }, [computerSerial]);
//
//
//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         ComputerService.findComputerBySerial(computerSerial).then((computer) => {
//             if (location.pathname === PATHS.SCAN.editComputer) {
//                 router.push(
//                     PATHS.COMPUTERS.edit + `${computerSerial}`,
//                     {computer: computer, comeFrom: location.pathname}
//                 );
//             } else if (location.pathname === PATHS.SCAN.endLoan ) {
//                 router.push(
//                     PATHS.LOANS.end + `${computerSerial}`,
//                     {computer: computer, comeFrom: location.pathname}
//                 );
//             }
//             setComputerSerial('');
//         }).catch(() => {
//             setOpen(true)
//         })
//     };
//
//     return (
//         <IonPage>
//             <IonContent>
//                 <form onSubmit={handleSubmit} className="flex-container">
//                     <CardComponent
//                         title="Scannez le PC"
//                         content={
//                             <>
//                                 <p>Ou tapez son numéro de série</p>
//                                 <AsciiInputComponent
//                                     value={computerSerial}
//                                     label="SerialNumber"
//                                     onIonChange={e => {
//                                         setComputerSerial(e.detail.value!);
//                                     }}
//                                     autoFocus
//                                 />
//                             </>
//                         }
//                         actions={
//                             <IonButton
//                                 className="green"
//                                 type="submit"
//                                 disabled={isValidateButtonDisabled(computerSerial, 7)}
//                             >
//                                 Valider
//                             </IonButton>}
//                     />
//                 </form>
//                 <CodeScannerComponent
//                     setComputerSerial={setComputerSerial}
//                     scanning={scanning}
//                     setScanning={setScanning}
//                     setAutoSubmit={setAutoSubmit}
//                 />
//             </IonContent>
//             <UnknownComputerModalComponent
//                 open={open}
//                 setIsOpen={setOpen}
//                 onComputerAdd={() => {
//                     router.push(PATHS.COMPUTERS.new, {
//                         computer: {serialNumber: computerSerial},
//                         comeFrom: location.pathname
//                     });
//                     setOpen(false);
//                     setComputerSerial('');
//                 }}
//                 onCancel={() => {
//                     setOpen(false);
//                     setComputerSerial('');
//                 }}
//             />
//         </IonPage>
//     );
// };

describe('FindComputerPage', () => {

    let useLocation: jest.SpyInstance;
    let useState: jest.SpyInstance;
    let useHistory: jest.SpyInstance;
    let UnknownComputerModalComponent: jest.SpyInstance;
    let ComputerServiceMock: jest.SpyInstance;

    beforeEach(() => {
        mockIonicReact();
        useLocation = jest.spyOn(require('react-router'), 'useLocation')
            .mockImplementation(() => ({
                pathname: '/scan/edit-computer',
            }));
        useHistory = jest.spyOn(require('react-router'), 'useHistory')
            .mockImplementation(() => ({
                push: jest.fn(),
            }))
        useState = jest.spyOn(React, 'useState');
        useState.mockImplementation((init) => [init, jest.fn(() => init)]);
        UnknownComputerModalComponent = jest.spyOn(require('commons/components/Modals/UnknownComputerModal/UnknownComputerModal.component'), 'default')
            .mockImplementation(() => <div/>);
        ComputerServiceMock = jest.spyOn(ComputerService, 'findComputerBySerial').mockImplementation(() => Promise.resolve({} as Computer));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render', async () => {
        const {container} = render(<FindComputerPage/>);
        await waitForIonicReact();
        expect(container).toBeTruthy();
    });

    it('should submit', async () => {
        const {container} = render(<FindComputerPage/>);
        await waitForIonicReact();
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form');
        await act(async () => {
            await form?.dispatchEvent(new Event('submit'));
        });
        expect(useHistory).toHaveBeenCalled();
    });

    it('should open modal', async () => {
        ComputerServiceMock.mockImplementation(() => Promise.reject());
        const {container} = render(<FindComputerPage/>);
        await waitForIonicReact();
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form');
        await act(async () => {
            await form?.dispatchEvent(new Event('submit'));
        });
        expect(UnknownComputerModalComponent).toHaveBeenCalled();
    });

});