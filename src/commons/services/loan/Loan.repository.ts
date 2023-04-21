class LoanRepository {
    url = "http://localhost/api/loans";
    async findAll() {
        const response = await fetch(this.url);
        return await response.json();
    }

    async findById(id: string) {
        const response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }

    async findByStudentId(studentId: string) {
        const response = await fetch(`${this.url}/search?studentId=${studentId}`);
        return await response.json();
    }
}

export default new LoanRepository();