import {Computer} from "../../models";

class ComputerRepository {
    private url = 'http://localhost/api/computers';

    async findAll(): Promise<Computer[]> {
        const response = await fetch(this.url);
        return await response.json();
    }

    async findById(id: string): Promise<Computer> {
        const response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }

    async findBySerial(serial: string): Promise<Computer> {
        const response = await fetch(`${this.url}/search?serialNumber=${serial}`);
        return await response.json();
    }

    async save(computer: Computer): Promise<Computer> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(computer)
        });
        return await response.json();
    }

    async replace(computer: Computer): Promise<Computer> {
        const response = await fetch(`${this.url}/${computer.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(computer)
        });
        return await response.json();
    }

    async update(computer: Computer): Promise<Computer> {
        const response = await fetch(`${this.url}/${computer.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(computer)
        });
        return await response.json();
    }

    async deleteById(id: string): Promise<void> {
        await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
    }


}

export default new ComputerRepository();

