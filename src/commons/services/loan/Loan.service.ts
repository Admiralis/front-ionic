import LoanRepository from "./Loan.repository";
import Loan from "../../models/loan/Loan.model";

class LoanService {

    async findLoans(): Promise<Loan[]> {
        return await LoanRepository.findAll();
    }

    async findLoanById(id: string): Promise<Loan> {
        const loan: Promise<Loan> = LoanRepository.findById(id);
        if (loan) {
            return loan;
        }
        throw new Error("Loan not found");
    }

    async findLoanByStudentId(studentId: string): Promise<Loan[]> {
        const loans: Promise<Loan[]> = LoanRepository.findByStudentId(studentId);
        if (loans) {
            return loans;
        }
        throw new Error("Loan not found");
    }

    async findLoanByComputerId(computerId: string): Promise<Loan[]> {
        const loans: Promise<Loan[]> = LoanRepository.findByComputerId(computerId);
        if (loans) {
            return loans;
        }
        throw new Error("Loan not found");
    }

    async findLoanByCourseId(courseId: string): Promise<Loan[]> {
        const loans: Promise<Loan[]> = LoanRepository.findByCourseId(courseId);
        if (loans) {
            return loans;
        }
        throw new Error("Loan not found");
    }

    async saveLoan(loan: Loan): Promise<Loan> {
        return await LoanRepository.save(loan);
    }

    async replaceLoan(loan: Loan): Promise<Loan> {
        return await LoanRepository.replace(loan);
    }

}

export default new LoanService();