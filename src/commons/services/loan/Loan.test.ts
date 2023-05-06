import {mockIonicReact} from '@ionic/react-test-utils'

import LoanService from "./Loan.service";
import LoanRepository from "./Loan.repository";
import Loan from "../../models/loan/Loan.model";

// class LoanService {
//
//     /**
//      * Récupère la liste des prêts
//      */
//     async findLoans(): Promise<Loan[]> {
//         const loans: Loan[] = await LoanRepository.findAll();
//         loans.forEach((loan: Loan) => {
//             this.convertDates(loan);
//         })
//         return loans;
//     }
//
//     /**
//      * Récupère un prêt par son id
//      * @param id
//      */
//     async findLoanById(id: string): Promise<Loan> {
//         const loan: Loan = await LoanRepository.findById(id);
//         if (loan) {
//             this.convertDates(loan);
//             return loan;
//         }
//         throw new Error("Loan not found");
//     }
//
//     /**
//      * Récupère tous les prêts ayant le label demandé
//      * @param studentId
//      */
//     async findLoanByStudentId(studentId: string): Promise<Loan[]> {
//         const loans: Loan[] = await LoanRepository.findByStudentId(studentId);
//         if (loans) {
//             loans.forEach(loan => this.convertDates(loan));
//             return loans;
//         }
//         return [] as Loan[];
//     }
//
//     /**
//      * Récupère tous les prêts utilisant un ordinateur spécifique
//      * @param computerId
//      */
//     async findLoanByComputerId(computerId: string): Promise<Loan[]> {
//         const loans: Loan[] = await LoanRepository.findByComputerId(computerId);
//         if (loans) {
//             loans.forEach(loan => this.convertDates(loan));
//             return loans;
//         }
//         return [] as Loan[];
//     }
//
//     async findByComputerIdAndInProgressStatus(computerId: string): Promise<Loan> {
//         const loan: Loan = await LoanRepository.findByComputerIdAndInProgressStatus(computerId);
//         if (loan) {
//             this.convertDates(loan);
//             return loan;
//         }
//         return {} as Loan;
//     }
//
//     /**
//      * Récupère tous les prêts d'un cours spécifique
//      * @param courseId
//      */
//     async findLoanByCourseId(courseId: string): Promise<Loan[]> {
//         const loans: Loan[] = await LoanRepository.findByCourseId(courseId);
//         if (loans) {
//             loans.forEach(loan => this.convertDates(loan));
//             return loans;
//         }
//         return [] as Loan[];
//     }
//
//     /**
//      * Créé un prêt ou le met à jour s'il existe déjà
//      * @param newLoan
//      */
//     async saveLoan(newLoan: Loan): Promise<Loan> {
//         const loan: Loan = await LoanRepository.save(newLoan);
//         return this.convertDates(loan);
//     }
//
//     /**
//      * Ecrase le prêt avec les nouvelles informations
//      * @param newLoan
//      */
//     async replaceLoan(newLoan: Loan): Promise<Loan> {
//         const loan: Loan = await LoanRepository.replace(newLoan);
//         return this.convertDates(loan);
//     }
//
//     async endLoan(loanToEnd: Loan): Promise<Loan> {
//         if (loanToEnd.id) {
//             const loan: Loan =  await LoanRepository.deleteById(loanToEnd.id);
//             return this.convertDates(loan);
//         }
//         throw new Error("Loan not found");
//     }
//
//     /**
//      * Convertit les dates ISO en objet Date
//      * @param loan
//      * @private
//      */
//     private convertDates(loan: Loan): Loan {
//         loan.startDate = new Date(loan.startDate);
//         loan.endDate = loan.endDate ? new Date(loan.endDate) : undefined;
//         if (loan.course) {
//             loan.course.startDate = new Date(loan.course.startDate);
//             loan.course.endDate = loan.course.endDate ? new Date(loan.course.endDate) : null;
//         }
//         return loan;
//     }
//
// }

describe('LoanService', () => {

    const findLoansMock = jest.fn(() => Promise.resolve([]));
    const findLoanByIdMock = jest.fn(() => Promise.resolve({} as Loan));
    const findLoanByStudentIdMock = jest.fn(() => Promise.resolve([]));
    const findLoanByComputerIdMock = jest.fn(() => Promise.resolve([]));
    const findByComputerIdAndInProgressStatusMock = jest.fn(() => Promise.resolve({} as Loan));
    const findLoanByCourseIdMock = jest.fn(() => Promise.resolve([]));
    const saveLoanMock = jest.fn(() => Promise.resolve({} as Loan));
    const replaceLoanMock = jest.fn(() => Promise.resolve({} as Loan));
    const endLoanMock = jest.fn(() => Promise.resolve({} as Loan));

    jest.doMock('./Loan.repository', () => {
        return {
            findAll: findLoansMock,
            findById: findLoanByIdMock,
            findByStudentId: findLoanByStudentIdMock,
            findByComputerId: findLoanByComputerIdMock,
            findByComputerIdAndInProgressStatus: findByComputerIdAndInProgressStatusMock,
            findByCourseId: findLoanByCourseIdMock,
            save: saveLoanMock,
            replace: replaceLoanMock,
            deleteById: endLoanMock
        }
    });

    beforeEach(() => {
        mockIonicReact();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should find all loans', async () => {
        const findLoansSpy = jest.spyOn(LoanRepository, 'findAll').mockResolvedValue([]);
        const loans: Loan[] = await LoanService.findLoans();
        expect(findLoansSpy).toHaveBeenCalled();
        expect(loans).toEqual([]);
    });


})