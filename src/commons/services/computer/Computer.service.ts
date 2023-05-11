import { Computer } from "commons/models";
// import ComputerRepository from "./Computer.repository.mock";
import {NewComputer} from "../../models";
import ComputerRepository from "./Computer.repository";

class ComputerService {

    async findComputers(): Promise<Computer[]> {
        return await ComputerRepository.findAll();
    }

    async findComputerById(id: string): Promise<Computer> {
        const computer = ComputerRepository.findById(id);
        if (computer) {
            return computer;
        }
        throw new Error("Computer not found");
    }

    async findComputerBySerial(serial: string): Promise<Computer> {
        const computer = ComputerRepository.findBySerial(serial);
        if (computer) {
            return Promise.resolve(computer);
        }
        throw new Error("Computer not found");

    }

    async saveComputer(computer: NewComputer): Promise<Computer> {
        return await ComputerRepository.save(computer);
    }

    async updateComputer(computer: Computer): Promise<Computer> {
        return await ComputerRepository.replace(computer);
    }

    async findOrCreateComputerBySerial(computer: NewComputer): Promise<Computer> {
        try {
            return await this.findComputerBySerial(computer.serialNumber);
        } catch (e) {
            return await this.saveComputer(computer);
        }
    }

    async computerExistsBySerial(serial: string): Promise<boolean> {
        try {
            await this.findComputerBySerial(serial);
            return Promise.resolve(true);
        } catch (e) {
            return Promise.resolve(false);
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ComputerService();