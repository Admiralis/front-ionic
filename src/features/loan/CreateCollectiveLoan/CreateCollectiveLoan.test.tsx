import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';

import CreateCollectiveLoanPage from "./CreateCollectiveLoan.page";
import {Computer, Course} from "../../../commons/models";
import Loan from "../../../commons/models/loan/Loan.model";
import {DepositState} from "../../../commons/models/loan/DepositState";
import {LoanStatus} from "../../../commons/models/loan/LoanStatus";
import {LoanType} from "../../../commons/models/loan/LoanType";

// const CreateCollectiveLoanPage = () => {
//
//     const [computer, setComputer] = useState({} as Computer);
//     const [course, setCourse] = useState({} as Course);
//     const [loan, setLoan] = useState({} as Loan)
//     const [showModal, setShowModal] = useState(false);
//     const [origin, setOrigin] = useState<string>('');
//
//     const router = useHistory();
//     const location = useLocation<{ comeFrom: string, computer: Computer, course: Course }>();
//     const {addLoan, error} = useLoans()
//
//     useEffect(() => {
//         if (!location.state) {
//             return;
//         }
//
//         if (location.state.computer) {
//             setComputer(location.state.computer);
//         }
//
//         if (location.state.course) {
//             setCourse(location.state.course);
//         }
//
//         setOrigin(location.state.comeFrom)
//
//     }, [location.state]);
//
//     useEffect(() => {
//         setLoan({
//             startDate: course.startDate,
//             endDate: course.endDate ? course.endDate : undefined,
//             deposit: DepositState.UNNECESSARY,
//             loanStatus: LoanStatus.IN_PROGRESS,
//             loanType: LoanType.COLLECTIVE,
//             course: course,
//             computer: computer
//         })
//     }, [computer, course])
//
//     useEffect(() => {
//         error && setShowModal(true)
//     }, [error])
//
//     const handleCancel = () => {
//         router.push(origin, {reScan: true});
//     };
//
//     const handleSubmitAndReScan = (e: any) => {
//         e.preventDefault();
//         addLoan(loan)
//         router.push(origin, {reScan: true});
//     }
//
//     const handleSubmitAndFinish = (e: any) => {
//         e.preventDefault();
//         addLoan(loan)
//         router.push("/");
//     }
//
//     return (
//         <IonPage>
//             <IonContent>
//                 <form className="flex-container">
//                     <CardComponent
//                         tiny
//                         title="Prêt collectif"
//                         content={
//                             <div>
//                                 <CourseFormComponent
//                                     newCourseInfo={course}
//                                     setNewCourseInfo={setCourse}
//                                 />
//                             </div>
//                         }
//                     />
//                     <CardComponent
//                         tiny
//                         title="Ordinateur"
//                         content={
//                             <EditComputerComponent
//                                 newComputerInfo={computer}
//                                 setNewComputerInfo={setComputer}
//                             />
//                         }
//                     />
//                     <CardComponent
//                         tiny
//                         title="Actions"
//                         content={
//                             <div>
//                                 <IonButton className="yellow large"
//                                            expand="block"
//                                            onClick={handleSubmitAndFinish}>
//                                     Terminer
//                                 </IonButton>
//                                 <div>
//                                     <IonButton className="red" onClick={handleCancel}>
//                                         Annuler
//                                     </IonButton>
//                                     <IonButton className="green" onClick={handleSubmitAndReScan}>
//                                         PC Suivant
//                                     </IonButton>
//                                 </div>
//                             </div>
//                         }
//                     />
//                 </form>
//             </IonContent>
//             <SimpleModalComponent
//                 isOpen={showModal}
//                 setIsOpen={setShowModal}
//                 title="Oops"
//                 content={
//                     <p>{error}</p>
//                 }
//             />
//         </IonPage>
//     );
// };
//
// export default CreateCollectiveLoanPage;


describe('CreateCollectiveLoanPage', () => {



    let useLocation: jest.SpyInstance;
    let useState: jest.SpyInstance;
    let useHistory: jest.SpyInstance;
    let useLoans: jest.SpyInstance;
    let computerMock: Computer;
    let courseMock: Course;
    let loanMock: Loan;

    beforeEach(() => {
        mockIonicReact();

        computerMock = {
            category: 'PC',
            comments: [],
            condition: 'neuf',
            processor: 'i5',
            ram: '8',
            serialNumber: "",
            id: '1'
        }

        courseMock = {
            endDate: new Date(),
            id: '1',
            label: "Test",
            place: 'Dans un test',
            startDate: new Date()

        }

        loanMock = {
            computer: computerMock,
            course: courseMock,
            deposit: DepositState.UNNECESSARY,
            endDate: undefined,
            id: "1",
            loanStatus: LoanStatus.IN_PROGRESS,
            loanType: LoanType.COLLECTIVE,
            startDate: new Date(),
            student: undefined,

        }


        useLocation = jest.spyOn(require('react-router'), 'useLocation')
            .mockImplementation(() => ({
                pathname: '/create-collective-loan',
                state: {
                    comeFrom: '',
                    computer: computerMock,
                    course: courseMock
                }
            }));

        // const [computer, setComputer] = useState({} as Computer);
        // const [course, setCourse] = useState({} as Course);
        // const [loan, setLoan] = useState({} as Loan)
        // const [showModal, setShowModal] = useState(false);
        // const [origin, setOrigin] = useState<string>('');
        useState = jest.spyOn(require('react'), 'useState')
            .mockImplementation(() => {
                return [{computerMock}, jest.fn((newComputer: Computer) => {
                    return newComputer
                })]
            })
            .mockImplementation(() => {
                return [{courseMock}, jest.fn((newCourse: Course) => {
                    return newCourse
                })]
            })
            .mockImplementation(() => {
                return [{loanMock}, jest.fn((newLoan: Loan) => {
                    return newLoan
                })]
            })
            .mockImplementation(() => {
                return [{showModal: false}, jest.fn((newValue: boolean) => {
                    return newValue
                })]
            })
            .mockImplementation(() => {
                return [{origin: ''}, jest.fn((newValue: string) => {
                    return newValue
                })]
            });

        useHistory = jest.spyOn(require('react-router'), 'useHistory')
            .mockImplementation(() => ({
                push: jest.fn()
            }));

        useLoans = jest.spyOn(require('commons/hooks/loans/useLoans'), 'default');
        useLoans.mockImplementation(() => {
            return {
                addLoan: jest.fn(),
                error: '',
                loading: false,
                loans: [],

            }
        });
    });

    it('should render', async () => {
        render(<CreateCollectiveLoanPage/>);

        await waitForIonicReact();

        expect(screen.getByText('Prêt collectif')).toBeInTheDocument();
        expect(screen.getByText('Ordinateur')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('should render with correct buttons', async () => {
        render(<CreateCollectiveLoanPage/>);

        await waitForIonicReact();

        expect(screen.getByText('Terminer')).toBeInTheDocument();
        expect(screen.getByText('Annuler')).toBeInTheDocument();
        expect(screen.getByText('PC Suivant')).toBeInTheDocument();
    });

    it('should not update computer and course if location.state is not defined', async () => {
        useLocation = jest.spyOn(require('react-router'), 'useLocation')
            .mockImplementation(() => ({
                pathname: '/create-collective-loan',
                state: undefined
            }));

        render(<CreateCollectiveLoanPage/>);

        await waitForIonicReact();
        expect(useState).not.toHaveBeenCalledWith(computerMock);
        expect(useState).not.toHaveBeenCalledWith(courseMock);
        expect(useState).not.toHaveBeenCalledWith('/create-collective-loan');
    });

    it('should update computer and course if location.state is defined', async () => {
        render(<CreateCollectiveLoanPage/>);

        await waitForIonicReact();
        expect(useState).toHaveBeenCalled()
    });

    it('should redirect to origin if the user click on cancel', async () => {
        render(<CreateCollectiveLoanPage/>);

        await waitForIonicReact();

        fireEvent.click(screen.getByText('Annuler'));
        expect(useHistory).toHaveBeenCalled();
    })

    it('should add loan and redirect to home plage if the user click on finish', async () => {
        render(<CreateCollectiveLoanPage/>);

        await waitForIonicReact();

        fireEvent.click(screen.getByText('Terminer'));
        expect(useLoans).toHaveBeenCalled();
        expect(useHistory).toHaveBeenCalled();
    })

    it('should add loan and redirect to origin if the user click on next computer', async () => {
        render(<CreateCollectiveLoanPage/>);

        await waitForIonicReact();

        fireEvent.click(screen.getByText('PC Suivant'));
        expect(useLoans).toHaveBeenCalled();
        expect(useHistory).toHaveBeenCalled();
    })

});