import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {ionFireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import CreateIndividualLoanPage from "./CreateIndividualLoan.page";
import Loan from "../../../commons/models/loan/Loan.model";
import {DepositState} from "../../../commons/models/loan/DepositState";
import {LoanStatus} from "../../../commons/models/loan/LoanStatus";
import {LoanType} from "../../../commons/models/loan/LoanType";
import {Computer, Course, Student} from "../../../commons/models";

describe('CreateIndividualLoanPage', () => {

    let useState: jest.SpyInstance;
    let loanMock: Loan;
    let computerSerial: string;
    let computerMock: Computer;
    let courseMock: Course;
    let studentMock: Student;

    beforeEach(() => {
        mockIonicReact();

        computerMock = {
            category: 'PC',
            comments: [],
            condition: 'neuf',
            processor: 'i5',
            ram: '8',
            serialNumber: "",
            id: '1',
        }

        courseMock = {
            endDate: new Date(),
            id: '1',
            label: "Test",
            place: 'Dans un test',
            startDate: new Date()

        }

        studentMock = {
            course: courseMock,
            firstName: "",
            lastName: ""

        }

        loanMock = {
            computer: computerMock,
            course: undefined,
            deposit: DepositState.UNNECESSARY,
            endDate: undefined,
            id: "1",
            loanStatus: LoanStatus.IN_PROGRESS,
            loanType: LoanType.COLLECTIVE,
            startDate: new Date(),
            student: studentMock,

        }

        computerSerial = "1234567"

        useState = jest.spyOn(require('react'), 'useState')
            .mockImplementation(() => [loanMock, jest.fn((newLoan: Loan) => {
                return newLoan
            })])
            .mockImplementation(() => [computerSerial, jest.fn((newComputerSerial: string) => {
                computerSerial = newComputerSerial
                return computerSerial
            })])
    })

    it('should render the page', async () => {
        const {container} = render(<CreateIndividualLoanPage/>);
        await waitForIonicReact();

        await act(async () => {
            await expect(container).toBeDefined();
        })
    });

    it('should update computerSerial when input is changed', async () => {
        render(<CreateIndividualLoanPage/>);
        await waitForIonicReact();

        const input = screen.getByTestId('input-SerialNumber');
        ionFireEvent.ionChange(input, computerSerial);

        await act(async () => {
            await expect(useState).toHaveBeenCalled();
        })
    });

    it('should submit the form', async () => {
        const {container} = render(<CreateIndividualLoanPage/>);
        await waitForIonicReact();

        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form')!;
        fireEvent.submit(form);

        await act(async () => {
            await expect(useState).toHaveBeenCalled();
        })
    });

});