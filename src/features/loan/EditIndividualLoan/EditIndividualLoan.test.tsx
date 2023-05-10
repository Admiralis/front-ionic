import EditIndividualLoanPage from "./EditIndividualLoan.page";
import {ionFireEvent, mockIonicReact, waitForIonicReact} from "@ionic/react-test-utils";
import {act, fireEvent, render, renderHook, screen} from "@testing-library/react";
import Loan from "commons/models/loan/Loan.model";
import {DepositState} from "../../../commons/models/loan/DepositState";
import {LoanType} from "../../../commons/models/loan/LoanType";
import {LoanStatus} from "../../../commons/models/loan/LoanStatus";
import useLoans from "../../../commons/hooks/loans/useLoans";
import React, {useEffect} from "react";
import {useHistory} from "react-router";

describe('EditIndividualLoanPage', () => {

    let loanMock: Loan;

    beforeEach(() => {
        mockIonicReact();

        loanMock = {
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
        }

        jest.spyOn(require('react-router'), 'useLocation').mockReturnValue({id: loanMock.id})
            .mockImplementation(() => {
                return {
                    pathname: '/loans/edit-individual-loan',
                    state: {loan: loanMock}
                }
            })

        jest.spyOn(require('react'), 'useState')
            .mockImplementation(() => [loanMock, jest.fn((newLoan) => {
                loanMock = newLoan
            })])

        //mock useLoan hook
        jest.spyOn(require('commons/hooks/loans/useLoans'), 'default')
            .mockReturnValue({
                addLoan: jest.fn(),
            })
        jest.spyOn(require('react-router'), 'useHistory')
            .mockImplementation(() => {
                return {
                    push: jest.fn()
                }
            })

    })


    it('should render the component', async () => {
        const {container} = render(<EditIndividualLoanPage/>);
        await waitForIonicReact()
        expect(container).toBeDefined();
    });

    it('should render the component with the correct loan', async () => {
        render(<EditIndividualLoanPage/>);
        await waitForIonicReact()

        let studentNameInput = screen.getByTestId('input-Nom')
        let studentFirstNameInput = screen.getByTestId('input-Prénom')
        let computerSerialNumberInput = screen.getByTestId('input-SerialNumber')
        let formationNameInput = screen.getByTestId('input-Formation')

        expect(studentNameInput).toHaveValue(loanMock.student?.lastName)
        expect(studentFirstNameInput).toHaveValue(loanMock.student?.firstName)
        expect(computerSerialNumberInput).toHaveValue(loanMock.computer?.serialNumber)
        expect(formationNameInput).toHaveValue(loanMock.student?.course?.label)
    });

    it('should addLoan', async () => {
        const {container} = render(<EditIndividualLoanPage/>);
        await waitForIonicReact()

        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form')!;
        fireEvent.submit(form);

        await act(async () => {
            await expect(useLoans().addLoan).toHaveBeenCalled()
        })
    });

    it('should update the state after mounting', async () => {
       render(<EditIndividualLoanPage/>);
       await waitForIonicReact()
        expect(React.useState).toHaveBeenCalled()
    })

    it('should go back to the previous page if the Annuler button is clicked', async () => {
        render(<EditIndividualLoanPage/>);
        await waitForIonicReact()

        const button = screen.getByTestId("cancel-button")
        ionFireEvent.click(button)

        await act(async () => {
            await expect(useHistory).toHaveBeenCalled()
        })
    })
});