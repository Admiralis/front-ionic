import LoanRepository from "./Loan.repository.mock";
import Loan from "../../models/loan/Loan.model";

/**
 * Service permettant de gérer les prêts
 */
class LoanService {

    /**
     * Récupère la liste des prêts
     */
    async findLoans(): Promise<Loan[]> {
        return await LoanRepository.findAll();
    }

    /**
     * Récupère un prêt par son id
     * @param id
     */
    async findLoanById(id: string): Promise<Loan> {
        const loan: Promise<Loan> = LoanRepository.findById(id);
        if (loan) {
            return loan;
        }
        throw new Error("Loan not found");
    }

    /**
     * Récupère tous les prêts ayant le label demandé
     * @param studentId
     */
    async findLoanByStudentId(studentId: string): Promise<Loan[]> {
        const loans: Promise<Loan[]> = LoanRepository.findByStudentId(studentId);
        if (loans) {
            return loans;
        }
        throw new Error("Loan not found");
    }

    /**
     * Récupère tous les prêts utilisant un ordinateur spécifique
     * @param computerId
     */
    async findLoanByComputerId(computerId: string): Promise<Loan[]> {
        const loans: Promise<Loan[]> = LoanRepository.findByComputerId(computerId);
        if (loans) {
            return loans;
        }
        throw new Error("Loan not found");
    }

    /**
     * Récupère tous les prêts d'un cours spécifique
     * @param courseId
     */
    async findLoanByCourseId(courseId: string): Promise<Loan[]> {
        const loans: Promise<Loan[]> = LoanRepository.findByCourseId(courseId);
        if (loans) {
            return loans;
        }
        throw new Error("Loan not found");
    }

    /**
     * Créé un prêt ou le met à jour s'il existe déjà
     * @param loan
     */
    async saveLoan(loan: Loan): Promise<Loan> {
        return await LoanRepository.save(loan);
    }

    /**
     * Ecrase le prêt avec les nouvelles informations
     * @param loan
     */
    async replaceLoan(loan: Loan): Promise<Loan> {
        return await LoanRepository.replace(loan);
    }

    async endLoan(loan: Loan): Promise<Loan> {
        if (loan.id) {
            return await LoanRepository.endLoan(loan.id);
        }
        throw new Error("Loan not found");
    }


}

export default new LoanService();