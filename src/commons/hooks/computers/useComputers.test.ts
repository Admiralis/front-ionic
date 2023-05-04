import {act, renderHook, waitFor} from '@testing-library/react'
import useComputers from "./useComputers";
import {Computer, NewComputer} from "../../models";

jest.mock('../../services/computer/Computer.service', () => ({
    findComputers: jest.fn(async () => {
            return [{serialNumber: 'AAAAAAA'}] as Computer[];
        }
    ),
    saveComputer: jest.fn(
        (newComputer: NewComputer) => new Promise((resolve) => resolve(newComputer))
    )
}));

describe('useComputers', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return computers, isLoading and error', async () => {
        const {result} = renderHook(() => useComputers());

        await act(async () => {
            await expect(result.current).toEqual({computers: [], isLoading: true, error: null, addComputer: expect.any(Function)});
        });
    });

    it('should call addComputer', async () => {
        const {result} = renderHook(() => useComputers());

        await act(async () => {
            await result.current.addComputer({} as NewComputer);
        });

        expect(result.current.computers.length).toEqual(1);
    });

});