import React from 'react';
import {render, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';

import IndividualLoanFormComponent from "./IndividualLoanForm.component";
import Loan from "../../../models/loan/Loan.model";
import {DepositState} from "../../../models/loan/DepositState";
import {LoanType} from "../../../models/loan/LoanType";
import {LoanStatus} from "../../../models/loan/LoanStatus";

describe('IndividualLoanFormComponent', () => {

    let props: any;
    const setLoanMock = jest.fn();

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
        // expect(screen.getByTestId('input-Date début')).toHaveValue("01/4/2023");
        // expect(screen.getByTestId('input-Date fin')).toHaveValue("30/06/2023");
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

    // it('should have a start date set to today if the loan has no start date', async () => {
    //     props.loan.startDate = null;
    //     render(<IndividualLoanFormComponent {...props}/>);
    //     expect(screen.getByTestId('input-Début prêt')).toHaveValue(new Date().toLocaleDateString());
    // });

    it('should not have endDate set if the loan has no course', async () => {
        props.loan.course = null;
        props.loan.endDate = null;
        render(<IndividualLoanFormComponent {...props}/>);
        expect(screen.getByTestId('input-Fin prêt')).toHaveValue("");
    });

});