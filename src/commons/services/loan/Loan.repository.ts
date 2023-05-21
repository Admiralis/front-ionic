import Loan from "../../models/loan/Loan.model";

class LoanRepository {

    private _url: string = "http://localhost/api/loans";

    set url(url: string) {
        this._url = url;
        console.log(this._url);
        console.log(url);
    }

    get url(): string {
        return this._url;
    }


    /**
     * Récupère la liste des prêts
     */
    async findAll(): Promise<Loan[]> {
        const response = await fetch(this.url);
        return await response.json();
    }

    /**
     * Récupère un prêt par son id
     * @param id
     */
    async findById(id: string): Promise<Loan> {
        const response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }

    /**
     * Récupère tous les prêts concernant un étudiant
     * @param studentId
     */
    async findByStudentId(studentId: string): Promise<Loan[]> {
        const response = await fetch(`${this.url}/student/${studentId}`);
        return await response.json();
    }

    /**
     * Récupère tous les prêts concernant un ordinateur
     * @param computerId
     */
    async findByComputerId(computerId: string): Promise<Loan[]> {
        const response = await fetch(`${this.url}/computer/${computerId}`);
        return await response.json();
    }

    /**
     * Récupère tous les prêts concernant un cours
     * @param courseId
     */
    async findByCourseId(courseId: string): Promise<Loan[]> {
        const response = await fetch(`${this.url}/course/${courseId}`);
        return await response.json();
    }

    /**
     * Récupère le prêt en cours pour un ordinateur spécifique
     * @param computerId
     */
    async findByComputerIdAndInProgressStatus(computerId: string): Promise<Loan> {
        const response = await fetch(`${this.url}/computer/${computerId}/in-progress`);
        if (response.status === 204) {
            return {} as Loan;
        }
        return await response.json();
    }

    async findByCourseIdAndInProgressStatus(courseId: string): Promise<Loan> {
        const response = await fetch(`${this.url}/course/${courseId}/in-progress`);
        if (response.status === 204) {
            return {} as Loan;
        }
        return await response.json();
    }

    async save(loan: Loan): Promise<Loan> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loan)
        });
        return await response.json();
    }

    async replace(loan: Loan): Promise<Loan> {
        const response = await fetch(`${this.url}/${loan.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loan)
        });
        return await response.json();
    }

    async update(loan: Loan): Promise<Loan> {
        const response = await fetch(`${this.url}/${loan.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loan)
        });
        return await response.json();
    }

    async deleteById(id: string): Promise<Loan> {
        const res = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
        return await res.json();

    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LoanRepository();