import {act, renderHook} from '@testing-library/react'
import useComputer from "./useComputer";

jest.mock('../../services/computer/Computer.service', () => ({
    findComputerBySerial: jest.fn()
}));

describe('useComputer', () => {
    it('should return computer, isLoading and error', async () => {
        const {result} = renderHook(() => useComputer('serialNumber'));

        await act(async () => {
            await expect(result.current).toEqual({computer: null, isLoading: true, error: null});
        });
    });
});