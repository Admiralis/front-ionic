import {act, renderHook} from '@testing-library/react'

import useLoans from "./useLoans";
import Loan from "../../models/loan/Loan.model";

jest.mock('../../services/loan/Loan.service', () => ({
    findLoans: jest.fn(async () => {
        return [] as Loan[];
    }),
    saveLoan: jest.fn(
        (newLoan: Loan) => new Promise((resolve) => resolve(newLoan))
    ),
    endLoan: jest.fn(
        (loan: Loan) => new Promise((resolve) => resolve(loan))
    )
}));

describe('useLoans', () => {

    beforeEach(() => {
        jest.clearAllMocks();
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
    });

});