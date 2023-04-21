import {Computer} from "../../models";

class ComputerRepository {
    private url = 'http://localhost/api/computers';

    /**
     * Récupère la liste des ordinateurs
     */
    async findAll(): Promise<Computer[]> {
        const response = await fetch(this.url);
        return await response.json();
    }

    /**
     * Récupère un ordinateur par son id
     * @param id
     */
    async findById(id: string): Promise<Computer> {
        const response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }

    /**
     * Recherche un ordinateur par son numéro de série
     * @param serial
     */
    async findBySerial(serial: string): Promise<Computer> {
        const response = await fetch(`${this.url}/search?serialNumber=${serial}`);
        return await response.json();
    }

    /**
     * Enregistre un ordinateur
     * @param computer
     */
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

    /**
     * Ecrase les informations d'un ordinateur
     * @param computer
     */
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

    /**
     * Met à jour les informations d'un ordinateur
     * @param computer
     */
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

    /**
     * Supprime un ordinateur par son id
     * @param id
     */
    async deleteById(id: string): Promise<void> {
        await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
    }


}

export default new ComputerRepository();

