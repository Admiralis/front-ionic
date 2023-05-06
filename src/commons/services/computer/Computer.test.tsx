import {mockIonicReact} from '@ionic/react-test-utils'

import ComputerService from "./Computer.service";
import {Computer, NewComputer} from "../../models";
import ComputerRepository from "./Computer.repository";
describe('ComputerService', () => {

    const findAllMock = jest.fn(() => Promise.resolve([]));
    const findByIdMock = jest.fn((id: string) => Promise.resolve({id: id} as unknown as Computer));
    const findBySerialMock = jest.fn((serial) => Promise.resolve({serialNumber: serial} as unknown as Computer));
    const saveMock = jest.fn((computer) => Promise.resolve(computer as unknown as Computer));

    jest.doMock('./Computer.repository', async () => {
        return {
            findAll: await findAllMock(),
            findById: await findByIdMock('ABCDEFG'),
            findBySerial: await findBySerialMock('ABCDEFG'),
            save: await saveMock({serialNumber: 'ABCDEFG'} as unknown as NewComputer),
        }
    });



    beforeEach(() => {
        mockIonicReact();

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should find all computers', async () => {
        const fincComputersSpy = jest.spyOn(ComputerRepository, 'findAll').mockResolvedValueOnce([])
        await ComputerService.findComputers();
        expect(fincComputersSpy).toHaveBeenCalled();
    });

    it('should find computer by id', async () => {
        const findComputerByIdSpy = jest.spyOn(ComputerRepository, 'findById').mockResolvedValueOnce({id: 'ABCDEFG'} as Computer)
        await ComputerService.findComputerById('ABCDEFG');
        expect(findComputerByIdSpy).toHaveBeenCalled();
    });

    it('should find computer by serial', async () => {
        const findComputerBySerialSpy = jest.spyOn(ComputerRepository, 'findBySerial').mockResolvedValueOnce({serialNumber: 'ABCDEFG'} as Computer)
        await ComputerService.findComputerBySerial('ABCDEFG');
        expect(findComputerBySerialSpy).toHaveBeenCalled();
    });

    it('should save computer', async () => {
        const saveComputerSpy = jest.spyOn(ComputerRepository, 'save').mockResolvedValueOnce({serialNumber: 'ABCDEFG'} as Computer)
        await ComputerService.saveComputer({serialNumber: 'ABCDEFG'} as NewComputer);
        expect(saveComputerSpy).toHaveBeenCalled();
    });

    it('should find or create computer by serial', async () => {
        const findComputerBySerialSpy = jest.spyOn(ComputerRepository, 'findBySerial').mockResolvedValueOnce(Promise.reject())
        const saveComputerSpy = jest.spyOn(ComputerRepository, 'save');
        await ComputerService.findOrCreateComputerBySerial({serialNumber: 'ABCDEFG'} as NewComputer);
        expect(findComputerBySerialSpy).toHaveBeenCalled();
        expect(saveComputerSpy).toHaveBeenCalled();
    });

    it('should check if computer exists by serial', async () => {
        const findComputerBySerialSpy = jest.spyOn(ComputerRepository, 'findBySerial').mockResolvedValueOnce({serialNumber: 'ABCDEFG'} as Computer)
        await ComputerService.computerExistsBySerial('ABCDEFG');
        expect(findComputerBySerialSpy).toHaveBeenCalled();
    });
});