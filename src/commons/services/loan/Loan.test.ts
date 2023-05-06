import {mockIonicReact} from '@ionic/react-test-utils'

import LoanService from "./Loan.service";
import LoanRepository from "./Loan.repository";
import Loan from "../../models/loan/Loan.model";
import {LoanStatus} from "../../models/loan/LoanStatus";
import {DepositState} from "../../models/loan/DepositState";
import {LoanType} from "../../models/loan/LoanType";

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

    const individualLoanMock: Loan = {
        loanType: LoanType.INDIVIDUAL,
        id: '1',
        startDate: new Date(),
        endDate: new Date(),
        student: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            course: {
                id: '1',
                label: 'Course 1',
                startDate: new Date(),
                endDate: new Date(),
                place: 'Place 1',
            }
        },
        computer: {
            id: '1',
            serialNumber: '123456',
            category: 'Laptop',
            ram: '8',
            processor: 'Intel Core i5',
            condition: 'Good',
            comments: [
                {
                    content: 'Comment 1'
                }
            ]
        },
        course: {
            id: '1',
            label: 'Course 1',
            startDate: new Date(),
            endDate: new Date(),
            place: 'Place 1',
        },
        loanStatus: LoanStatus.IN_PROGRESS,
        deposit: DepositState.UNNECESSARY
    }

    const collectiveLoanMock: Loan = {
        loanType: LoanType.COLLECTIVE,
        id: '2',
        startDate: new Date(),
        endDate: new Date(),
        course: {
            id: '1',
            label: 'Course 1',
            startDate: new Date(),
            endDate: new Date(),
            place: 'Place 1',
        },
        computer: {
            id: '1',
            serialNumber: '123456',
            category: 'Laptop',
            ram: '8',
            processor: 'Intel Core i5',
            condition: 'Good',
            comments: [
                {
                    content: 'Comment 1'
                }
            ]
        },
        loanStatus: LoanStatus.FINISHED,
        deposit: DepositState.UNNECESSARY
    }

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
        const findLoansSpy = jest.spyOn(LoanRepository, 'findAll').mockResolvedValue([individualLoanMock, collectiveLoanMock]);
        const loans: Loan[] = await LoanService.findLoans();
        expect(findLoansSpy).toHaveBeenCalled();
        expect(loans).toEqual([individualLoanMock, collectiveLoanMock]);
    });

    it('should find loan by id', async () => {
        const findLoanByIdSpy = jest.spyOn(LoanRepository, 'findById').mockResolvedValue(individualLoanMock);
        const loan: Loan = await LoanService.findLoanById('1');
        expect(findLoanByIdSpy).toHaveBeenCalled();
        expect(loan).toEqual(individualLoanMock);
    });

    it('should find loan by student id', async () => {
        const findLoanByStudentIdSpy = jest.spyOn(LoanRepository, 'findByStudentId').mockResolvedValue([individualLoanMock]);
        const loans: Loan[] = await LoanService.findLoanByStudentId('1');
        expect(findLoanByStudentIdSpy).toHaveBeenCalled();
        expect(loans).toEqual([individualLoanMock]);
    });

    it('should find loan by computer id', async () => {
        const findLoanByComputerIdSpy = jest.spyOn(LoanRepository, 'findByComputerId').mockResolvedValue([individualLoanMock, collectiveLoanMock]);
        const loans: Loan[] = await LoanService.findLoanByComputerId('123456');
        expect(findLoanByComputerIdSpy).toHaveBeenCalled();
        expect(loans).toEqual([individualLoanMock, collectiveLoanMock]);
    });

    it('should find loan by course id', async () => {
        const findLoanByCourseIdSpy = jest.spyOn(LoanRepository, 'findByCourseId').mockResolvedValue([individualLoanMock, collectiveLoanMock]);
        const loans: Loan[] = await LoanService.findLoanByCourseId('1');
        expect(findLoanByCourseIdSpy).toHaveBeenCalled();
        expect(loans).toEqual([individualLoanMock, collectiveLoanMock]);
    });

    it('should find loan by computer id and in progress status', async () => {
        const findByComputerIdAndInProgressStatusSpy = jest.spyOn(LoanRepository, 'findByComputerIdAndInProgressStatus').mockResolvedValue(individualLoanMock);
        const loan: Loan = await LoanService.findByComputerIdAndInProgressStatus('1');
        expect(findByComputerIdAndInProgressStatusSpy).toHaveBeenCalled();
        expect(loan).toEqual(individualLoanMock);
    });

    it('should save loan', async () => {
        const saveLoanSpy = jest.spyOn(LoanRepository, 'save').mockResolvedValue(individualLoanMock);
        const loan: Loan = await LoanService.saveLoan(individualLoanMock);
        expect(saveLoanSpy).toHaveBeenCalled();
        expect(loan).toEqual(individualLoanMock);
    });

    it('should replace loan', async () => {
        const replaceLoanSpy = jest.spyOn(LoanRepository, 'replace').mockResolvedValue(individualLoanMock);
        const loan: Loan = await LoanService.replaceLoan(individualLoanMock);
        expect(replaceLoanSpy).toHaveBeenCalled();
        expect(loan).toEqual(individualLoanMock);
    });

    it('should end loan', async () => {
        const endLoanSpy = jest.spyOn(LoanRepository, 'deleteById').mockResolvedValue({...individualLoanMock, loanStatus: LoanStatus.FINISHED});
        const loan: Loan = await LoanService.endLoan(individualLoanMock);
        expect(endLoanSpy).toHaveBeenCalled();
        expect(loan).toEqual({...individualLoanMock, loanStatus: LoanStatus.FINISHED});
    });

    it('should throw error when loan is not found', async () => {
        const findLoanByIdSpy = jest.spyOn(LoanRepository, 'findById').mockResolvedValue(Promise.reject(new Error ('Loan not found')));
        await expect(LoanService.findLoanById('3')).rejects.toThrow(new Error ('Loan not found'));
        expect(findLoanByIdSpy).toHaveBeenCalled();
    });
})