import {Computer} from "commons/models";
import ComputerComment from "../../models/computer/ComputerComment";
import {NewComputer} from "commons/models";

const computers: Computer[] = [
    {
        id: "1",
        serial: "ABCDEFG",
        category: "Dev",
        ram: "16GB",
        processor: "i5",
        condition: "Usé",
        comments: [
            {
                content: "Griffe sur l'écran"
            },
            {
                content: "Touche clavier 'INSER' HS"
            }]
    },
    {
        id: "2",
        serial: "HIJKLMN",
        category: "Admin",
        ram: "32GB",
        processor: "i7",
        condition: "Neuf",
        comments: []
    },
    {
        id: "3",
        serial: "OPQRSTU",
        category: "Bureautique",
        ram: "8GB",
        processor: "i3",
        condition: null,
        comments: []
    },
    {
        id: "4",
        serial: "VWXYZAB",
        category: null,
        ram: null,
        processor: null,
        condition: null,
        comments: []
    },
]

class ComputerRepository {

    /**
     * Retourne tous les ordinateurs
     */
    findAll(): Promise<Computer[]> {
        return Promise.resolve(computers);
    }

    /**
     * Retourne un ordinateur par son id
     * @param id
     */
    findById(id: string): Promise<Computer> {
        let computer = computers.find(computer => computer.id === id);
        if (computer) {
            return Promise.resolve(computer);
        }
        return Promise.reject(new Error("Computer not found"));
    }

    /**
     * Retourne un ordinateur par son numéro de série
     * @param serial
     */
    findBySerial(serial: string): Promise<Computer> {
        let computer = computers.find(computer => computer.serial === serial);
        if (computer) {
            return Promise.resolve(computer);
        }
        return Promise.reject(new Error("Computer not found"));
    }

    /**
     * Retourne tous les ordinateurs par leur catégorie
     * @param newComputer
     */
    save(newComputer: NewComputer): Promise<Computer> {
        const computer: Computer = {
            ...newComputer,
            id: (computers.length + 1).toString(),
        }
        computers.push(computer);
        return Promise.resolve(computer);
    }

    /**
     * Remplace l'ordinateur par celui passé en paramètre
     * @param computer
     */
    replace(computer: Computer): Promise<Computer> {
        const index = computers.findIndex(c => c.id === computer.id);
        computers[index] = computer;
        return Promise.resolve(computer);
    }

    /**
     * Met à jour l'ordinateur par celui passé en paramètre
     * @param id
     * @param computer
     */
    update(id: string, computer: Computer): Promise<Computer> {
        const index = computers.findIndex(c => c.id === id);
        computers[index] = computer;
        return Promise.resolve(computer);
    }

    /**
     * Supprime l'ordinateur par son id
     * @param id
     */
    deleteById(id: string): Promise<void> {
        const index = computers.findIndex(computer => computer.id === id);
        computers.splice(index, 1);
        return Promise.resolve();
    }
};

export default Object.freeze(new ComputerRepository());