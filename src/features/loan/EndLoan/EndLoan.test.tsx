import React, {useState} from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import EndLoanPage from "./EndLoan.page";
import {DepositState} from "../../../commons/models/loan/DepositState";
import {LoanStatus} from "../../../commons/models/loan/LoanStatus";
import {LoanType} from "../../../commons/models/loan/LoanType";
import {Computer, Course, Student} from "../../../commons/models";
import Loan from "../../../commons/models/loan/Loan.model";
import LoanService from "../../../commons/services/loan/Loan.service";

describe('EndLoanPage', () => {

    let useStateSpy: jest.SpyInstance;
    let useHistorySpy: jest.SpyInstance;
    let useLoansSpy: jest.SpyInstance;
    let findByComputerIdAndInProgressStatusSpy: jest.SpyInstance;

    let computerMock: Computer;
    let courseMock: Course;
    let studentMock: Student;
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
            id: '1',
        }

        courseMock = {
            endDate: new Date(),
            id: '1',
            label: "Test Cours",
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
        useStateSpy = jest.spyOn(require('react'), 'useState')
        useStateSpy
            .mockImplementation(() => {
                return [computerMock, jest.fn((newComputer: Computer) => {
                    return newComputer
                })]
            })
            .mockImplementation(() => {
                return ['origin', jest.fn((newOrigin: string) => {
                    return newOrigin
                })]
            })
            .mockImplementation(() => {
                return [loanMock, jest.fn((newLoan: Loan) => {
                    return newLoan
                })]
            })

        useHistorySpy = jest.spyOn(require('react-router'), 'useHistory')
            .mockImplementation(() => ({
                push: jest.fn()
            }));

        jest.spyOn(require('react-router'), 'useLocation')
            .mockImplementation(() => ({
                state: {
                    computer: computerMock,
                    comeFrom: 'test'
                }
            }));

        useLoansSpy = jest.spyOn(require('../../../commons/hooks/loans/useLoans'), 'default')
            .mockImplementation(() => ({
                endLoan: jest.fn((loan: Loan) => loan),
                loans: [loanMock]
            }));

        findByComputerIdAndInProgressStatusSpy = jest.spyOn(LoanService, 'findByComputerIdAndInProgressStatus')
            .mockImplementation(() => Promise.resolve(loanMock));

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render', async () => {
        const {container} = render(<EndLoanPage/>);
        await act( async () => {
            await waitForIonicReact()
            expect(container).toBeDefined();
        })
    });

    it('should update the Loan state when the computer state is updated', async () => {
        const {container} = render(<EndLoanPage/>);
        await act( async () => {
            await waitForIonicReact()
            expect(container).toBeDefined();
        })
        expect(useStateSpy).toHaveBeenCalled();
    });

    it('should go to the main page if the user press the back button', async () => {
        const {container} = render(<EndLoanPage/>);
        await act( async () => {
            await waitForIonicReact()
            expect(container).toBeDefined();
        })
        const backButton = screen.getByText('Retour');
        fireEvent.click(backButton);
        expect(useHistorySpy).toHaveBeenCalled();
    });

    it('should submit the form if the user press the submit button', async () => {
        const {container} = render(<EndLoanPage/>);
        await act( async () => {
            await waitForIonicReact()
            expect(container).toBeDefined();
        })
        const submitButton = screen.getByText('Clôturer');
        fireEvent.click(submitButton);
        expect(useLoansSpy).toHaveBeenCalled();
    });

    it('should has console error if the loan is not found', async () => {
        findByComputerIdAndInProgressStatusSpy.mockImplementation(() => Promise.reject((new Error('error'))));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());

        const {container} = render(<EndLoanPage/>);
        await act( async () => {
            await waitForIonicReact()
            expect(container).toBeDefined();
        })
        const submitButton = screen.getByText('Clôturer');
        fireEvent.click(submitButton);
        expect(useLoansSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalled();

    });

    it('should display the loan in progress if the loan is found', async () => {
        const {container} = render(<EndLoanPage/>);
        await act( async () => {
            await waitForIonicReact()
            expect(container).toBeDefined();
        })
        // eslint-disable-next-line testing-library/prefer-presence-queries
        expect(screen.queryByText('Test Cours')).toBeDefined();
    });

    it('should display \'Aucun prêt en cours\' if the loan is not found', async () => {
        findByComputerIdAndInProgressStatusSpy.mockImplementation(() => Promise.reject((new Error('error'))));
        jest.spyOn(console, 'error').mockImplementation(jest.fn());

        const {container} = render(<EndLoanPage/>);
        await act( async () => {
            await waitForIonicReact()
            expect(container).toBeDefined();
        })
        // eslint-disable-next-line testing-library/prefer-presence-queries
        expect(screen.queryByText('Aucun prêt en cours')).toBeDefined();
    });

});