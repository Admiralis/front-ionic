import React from 'react';
import {act, render, renderHook, screen} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {useLocation} from "react-router";
import {Computer, NewComputer} from "../../../commons/models";
import EditComputerPage from "./EditComputer.page";
import useComputers from "../../../commons/hooks/computers/useComputers";

// interface AddComputerFormConfirmComponentProps {
//     origin: string;
// }
// const AddComputerFormActions = (props: AddComputerFormConfirmComponentProps) => {
//
//     const {origin} = props;
//
//     const router = useHistory();
//     const handleCancel = () => {
//         router.push(origin, {computer: {} as NewComputer});
//     };
//     return (
//         <>
//             <IonButton className="red" onClick={handleCancel}>Annuler</IonButton>
//             <IonButton className="green" type="submit">Valider</IonButton>
//         </>
//     );
// }
//
// /**
//  * Page de confirmation de l'ajout d'un PC
//  * Reprend les informations du formulaire '/add' et permet d'y ajouter des commentaires au PC
//  */
// const EditComputerPage = () => {
//
//     const location = useLocation<{ computer: NewComputer, comeFrom: string, course: Course }>();
//     const [newComputerInfo, setNewComputerInfo] = useState({} as NewComputer);
//     const [origin, setOrigin] = useState<string>('');
//     const router = useHistory();
//     const {addComputer} = useComputers();
//
//     useEffect(() => {
//
//         if (!location.state) {
//             return;
//         }
//
//         if (!location.state.computer?.comments) {
//             setNewComputerInfo({
//                 ...location.state.computer,
//                 comments: []
//             });
//         } else {
//             setNewComputerInfo(location.state.computer);
//         }
//
//         if (location.state.comeFrom) {
//             setOrigin(location.state.comeFrom);
//         } else {
//             setOrigin('');
//         }
//
//     }, [location.state]);
//
//     /**
//      * Soumet le formulaire et redirige vers la page de scan
//      * Passe le paramètre "reScan" à true pour ouvrir automatiquement la caméra sur Android
//      * @param e
//      */
//     const handleSubmit = (e: any) => {
//         e.preventDefault();
//         addComputer(newComputerInfo);
//         router.push(origin , {reScan: true});
//     }
//
//     return (
//         <div>
//             <IonPage>
//                 <IonContent>
//                     <form className="flex-container" onSubmit={handleSubmit}>
//                         <CardComponent
//                             title="Valider un PC"
//                             content={<EditComputerComponent newComputerInfo={newComputerInfo}
//                                                             setNewComputerInfo={setNewComputerInfo}/>}
//                             actions={<AddComputerFormActions origin={origin} />}
//                         />
//                     </form>
//                 </IonContent>
//             </IonPage>
//         </div>
//     );
// };

describe('EditComputerPage', () => {
    let useLocationMock: jest.SpyInstance;
    let useComputersMock: jest.SpyInstance;
    let useComputersSpy: jest.SpyInstance;
    let useStateMock: jest.SpyInstance;

    jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useState: jest.fn()
    }))

    const newComputerInfoMock: NewComputer = {
        category: 'Laptop',
        comments: [],
        condition: 'Good',
        processor: 'i5',
        ram: '8',
        serialNumber: '1234567',
    }

    beforeEach(() => {
        mockIonicReact();
        useLocationMock = jest.spyOn(require('react-router'), 'useLocation');
        useLocationMock.mockReturnValue({state: {computer: newComputerInfoMock, comeFrom: '/scan'}});
        useComputersSpy = jest.spyOn(require('commons/hooks/computers/useComputers'), 'default').mockReturnValue({
            addComputer: jest.fn((newComputer: NewComputer) => Promise.resolve(newComputer)),
            computers: [newComputerInfoMock] as Computer[],
            error: undefined,
            loading: false,
        });
        useStateMock = jest.spyOn(require('react'), 'useState').mockReturnValue([newComputerInfoMock, jest.fn()]);

    });

    afterEach(() => {
        useLocationMock.mockRestore();
    });

    it('should render', async () => {
        const {container} = await render(<EditComputerPage/>);
        await waitForIonicReact()
        await act(async () => {
            expect(container).toBeDefined();
        });
    });

});
