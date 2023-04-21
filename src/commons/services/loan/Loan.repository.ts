import Loan from "../../models/loan/Loan.model";

class LoanRepository {
    url = "http://localhost/api/loans";
    async findAll(): Promise<Loan[]> {
        const response = await fetch(this.url);
        return await response.json();
    }

    async findById(id: string): Promise<Loan> {
        const response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }

    async findByStudentId(studentId: string): Promise<Loan[]> {
        const response = await fetch(`${this.url}/student/${studentId}`);
        return await response.json();
    }

    async findByComputerId(computerId: string): Promise<Loan[]> {
        const response = await fetch(`${this.url}/computer/${computerId}`);
        return await response.json();
    }

    async findByCourseId(courseId: string): Promise<Loan[]> {
        const response = await fetch(`${this.url}/course/${courseId}`);
        return await response.json();
    }

    async findByComputerIdAndInProgressStatus(computerId: string): Promise<Loan> {
        const response = await fetch(`${this.url}/computer/${computerId}/in-progress`);
        return await response.json();
    }

    async findByCourseIdAndInProgressStatus(courseId: string): Promise<Loan> {
        const response = await fetch(`${this.url}/course/${courseId}/in-progress`);
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

export default new LoanRepository();