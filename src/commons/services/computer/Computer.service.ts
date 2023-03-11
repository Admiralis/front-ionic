import { Computer } from "commons/models";
import ComputerRepository from "./Computer.repository";
import {NewComputer} from "../../models";

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

    async findOrCreateComputerBySerial(computer: NewComputer): Promise<Computer> {
        try {
            return await this.findComputerBySerial(computer.serial);
        } catch (e) {
            return await this.saveComputer(computer);
        }
    }
}

export default new ComputerService();