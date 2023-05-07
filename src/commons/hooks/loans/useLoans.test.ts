import {act, renderHook} from '@testing-library/react'

import useLoans from "./useLoans";
import Loan from "../../models/loan/Loan.model";
import LoanService from "../../services/loan/Loan.service";
import {waitForIonicReact} from "@ionic/react-test-utils";

// jest.mock('../../services/loan/Loan.service', () => ({
//     findLoans: jest.fn(async () => {
//         return [] as Loan[];
//     }),
//     saveLoan: jest.fn(
//         (newLoan: Loan) => new Promise((resolve) => resolve(newLoan))
//     ),
//     endLoan: jest.fn(
//         (loan: Loan) => new Promise((resolve) => resolve(loan))
//     )
// }));


describe('useLoans', () => {

    jest.spyOn(console, 'error').mockImplementation(() => {
    });

    let findLoansSpy: jest.SpyInstance;
    let saveLoanSpy: jest.SpyInstance;
    let endLoanSpy: jest.SpyInstance;
    let useStateSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        findLoansSpy = jest.spyOn(LoanService, 'findLoans')
            .mockImplementation(async () => {
                return [] as Loan[];
            });

        saveLoanSpy = jest.spyOn(LoanService, 'saveLoan')
            // .mockImplementation((newLoan: Loan) => new Promise((resolve) => resolve(newLoan)));

        endLoanSpy = jest.spyOn(LoanService, 'endLoan')
            // .mockImplementation((loan: Loan) => new Promise((resolve) => resolve(loan)));

    });

    it('should return loans, isLoading and error, addLoan and endLoan', async () => {
        const {result} = renderHook(() => useLoans());

        await act(async () => {
            await expect(result.current).toEqual({
                loans: [],
                isLoading: true,
                error: null,
                addLoan: expect.any(Function),
                endLoan: expect.any(Function)
            });
        });
    });

    it('should call addLoan', async () => {
        const {result} = renderHook(() => useLoans());

        await act(async () => {
            await result.current.addLoan({} as Loan);
        });

        expect(result.current.loans.length).toEqual(1);
        // expect(saveLoanSpy).toHaveBeenCalled();
    });

    it('should console error', async () => {
        findLoansSpy.mockImplementation(async () => {
            throw new Error('error');
        });
        const {result, rerender} = await renderHook(() => useLoans());
        await waitForIonicReact();
        await rerender();
        expect(result.current.error).toEqual('error');
    });

    it('should call endLoan', async () => {
        const {result} = renderHook(() => useLoans());

        const loan: Loan = {
            id: '1',
            startDate: new Date(),
        } as Loan;

        await act(async () => {
            await result.current.addLoan(loan);
        });
        expect(result.current.loans.length).toEqual(1);

        await act(async () => {
            await result.current.endLoan(loan);
        });
        expect(result.current.loans.length).toEqual(0);

        expect(endLoanSpy).toHaveBeenCalled();
    });

    it('should return set the error in case of error on addLoan', async () => {
        saveLoanSpy.mockImplementation(async () => {
            throw new Error('error');
        });
        const {result} = renderHook(() => useLoans());

        await act(async () => {
            await result.current.addLoan({} as Loan);
        });

        expect(result.current.error).toEqual('error');
    });

    it('should return set the error in case of error on endLoan', async () => {
        endLoanSpy.mockImplementation(async () => {
            throw new Error('error');
        });
        const {result} = renderHook(() => useLoans());

        await act(async () => {
            await result.current.endLoan({} as Loan);
        });

        expect(result.current.error).toEqual('error');
    });

});