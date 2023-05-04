import React, {useEffect, useState} from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';

import IndividualLoanFormComponent from "./IndividualLoanForm.component";
import Loan from "../../../models/loan/Loan.model";
import {DepositState} from "../../../models/loan/DepositState";
import {LoanType} from "../../../models/loan/LoanType";
import {LoanStatus} from "../../../models/loan/LoanStatus";
import AutocompleteCourseInputComponent from "../Inputs/AutocompleteCourseInput/AutocompleteCourseInput.component";
import {AsciiDatePickerComponent} from "../Inputs/AsciiDate/AsciiDate.component";


// interface IndividualLoanComponentProps {
//     loan: Loan;
//     setLoan: (newIndividualLoanInfo: Loan) => void;
// }
//
// function IndividualLoanFormComponent(props: IndividualLoanComponentProps) {
//
//     const {loan = {} as Loan, setLoan} = props;
//     const [startDate, setStartDate] = useState<Date>(new Date());
//
//     return (
//         <>
//             <AsciiInputComponent
//                 label="Nom"
//                 value={loan.student?.firstName || ''}
//                 onIonChange={(event) => {
//                     setLoan({
//                             ...loan,
//                             student: {
//                                 ...loan.student,
//                                 firstName: event.detail.value!
//                             }
//                         } as Loan
//                     )
//                 }}
//                 required
//             />
//             <AsciiInputComponent
//                 label="Prénom"
//                 value={loan.student?.lastName || ''}
//                 onIonChange={(event) => {
//                     setLoan({
//                         ...loan,
//                         student: {
//                             ...loan.student,
//                             lastName: event.detail.value!
//                         }
//                     } as Loan)
//                 }}
//                 required
//             />
//             <AutocompleteCourseInputComponent
//                 course={loan.course}
//                 setCourse={(newCourse) => {
//                     setLoan({
//                         ...loan,
//                         course: newCourse
//                     })
//                 }}
//             />
//             <AsciiDatePickerComponent
//                 label="Date début"
//                 // value={loan.course?.startDate ? new Date(loan.course?.startDate) : new Date()}
//                 value={loan?.startDate ? new Date(loan.startDate) : loan.course?.startDate ? new Date (loan.course.startDate) : startDate}
//                 onChange={(event) => {
//                     const newStartDate = new Date(event.detail.value!);
//                     setLoan({
//                         ...loan,
//                         startDate: new Date(newStartDate)
//                     })
//                     setStartDate(new Date(newStartDate));
//                 }}
//             />
//             <AsciiDatePickerComponent
//                 label="Date fin"
//                 min={startDate.toISOString()}
//                 max={loan.course?.endDate ? new Date(loan.course.endDate).toISOString() : new Date(startDate.getFullYear() + 3, startDate.getMonth(), startDate.getDate()).toISOString()}
//                 value={loan?.endDate ? new Date(loan.endDate) : loan.course?.endDate ? new Date (loan.course.endDate) : null}
//                 onChange={(event) => {
//                     setLoan({
//                         ...loan,
//                         endDate: new Date(event.detail.value!)
//                     })
//                 }}
//             />
//         </>
//     );
// }

describe('IndividualLoanFormComponent', () => {

    let props: any;
    const setLoanMock = jest.fn();
    // Mock AutocompleteCourseInputComponent
    // jest.doMock('commons/components/Forms/Inputs/AsciiDate/AsciiDate.component.tsx', () => {
    //     return {
    //         __esModule: true,
    //         default: () => {
    //             return <div data-testid="autocomplete-course-input"/>
    //         }
    //     }
    // });

    jest.doMock('commons/components/Forms/Inputs/AsciiDate/AsciiDate.component.tsx');


    beforeEach(() => {
        mockIonicReact();
        props = {
            loan: {
                id: "2",
                startDate: new Date("2023-04-01"),
                endDate: new Date("2023-06-30"),
                deposit: DepositState.PAID,
                loanType: LoanType.INDIVIDUAL,
                loanStatus: LoanStatus.IN_PROGRESS,
                student: {
                    id: "3",
                    firstName: "Jack",
                    lastName: "Angular",
                    course: {
                        id: "5",
                        label: "React",
                        startDate: new Date("2023-04-01"),
                        endDate: new Date("2023-06-30"),
                        place: "Salle 3"
                    }
                },
                computer: {
                    id: "4",
                    serialNumber: "VWXYZAB",
                    category: null,
                    ram: null,
                    processor: null,
                    condition: null,
                    comments: []
                }
            } as Loan,
            setLoan: setLoanMock
        }
    })

    it('should render the component', async () => {
        const {container} = render(<IndividualLoanFormComponent {...props}/>);
        await waitForIonicReact();
        expect(container).toBeDefined();

    });

    it('should render the component with the correct values', async () => {
        render(<IndividualLoanFormComponent {...props}/>);
        expect(screen.getByTestId('input-Nom')).toHaveValue("Jack");
        expect(screen.getByTestId('input-Prénom')).toHaveValue("Angular");
        expect(screen.getByTestId('input-Date début')).toHaveValue("01/04/2023");
        expect(screen.getByTestId('input-Date fin')).toHaveValue("30/06/2023");
    });

    it('should have empty values if the loan has no student', async () => {
        props.loan.student = null;
        render(<IndividualLoanFormComponent {...props}/>);
        expect(screen.getByTestId('input-Nom')).toHaveValue("");
        expect(screen.getByTestId('input-Prénom')).toHaveValue("");
    });

    it('should update the loan when the user change the first name', async () => {
        render(<IndividualLoanFormComponent {...props}/>);
        const input = screen.getByTestId('input-Nom');
        fireEvent.ionChange(input, "John");
        expect(setLoanMock).toHaveBeenCalledWith({
            ...props.loan,
            student: {
                ...props.loan.student,
                firstName: "John"
            }
        });
    });

    it('should update the loan when the user change the last name', async () => {
        render(<IndividualLoanFormComponent {...props}/>);
        const input = screen.getByTestId('input-Prénom');
        fireEvent.ionChange(input, "React");
        expect(setLoanMock).toHaveBeenCalledWith({
            ...props.loan,
            student: {
                ...props.loan.student,
                lastName: "React"
            }
        });
    });

    it('should have a start date set to today if the loan has no start date', async () => {
        props.loan.startDate = null;
        render(<IndividualLoanFormComponent {...props}/>);
        expect(screen.getByTestId('input-Date début')).toHaveValue(new Date().toLocaleDateString());
    });

    it('should not have endDate set if the loan has no course', async () => {
        props.loan.course = null;
        props.loan.endDate = null;
        render(<IndividualLoanFormComponent {...props}/>);
        expect(screen.getByTestId('input-Date fin')).toHaveValue("");
    });

});