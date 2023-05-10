import {act, renderHook} from '@testing-library/react'
import useComputers from "./useComputers";
import {Computer, NewComputer} from "../../models";
import ComputerService from "../../services/computer/Computer.service";

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
    let findComputersSpy: jest.SpyInstance;
    let saveComputerSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        findComputersSpy = jest.spyOn(ComputerService, 'findComputers')
            .mockImplementation(async () => {
                return [] as Computer[];
            });

        saveComputerSpy = jest.spyOn(ComputerService, 'saveComputer')

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

    it('should set error when findComputers throws error', async () => {
        findComputersSpy.mockImplementation(async () => {
            throw new Error('error');
        });

        const {result} = renderHook(() => useComputers());

        await act(async () => {
            await result.current.addComputer({} as NewComputer);
        });

        expect(result.current.error).toEqual('error');
    });

    it('should set error when saveComputer throws error', async () => {
        saveComputerSpy.mockImplementation(async () => {
            throw new Error('error');
        });

        const {result} = renderHook(() => useComputers());

        await act(async () => {
            await result.current.addComputer({} as NewComputer);
        });

        expect(result.current.error).toEqual('error');
    });

});