import Loan from "../../models/loan/Loan.model";
import {DepositState} from "../../models/loan/DepositState";
import {LoanType} from "../../models/loan/LoanType";
import {LoanStatus} from "../../models/loan/LoanStatus";
import Course from "../../models/course/Course.model";
import Student from "../../models/student/Student.model";
import Computer, {ComputerStatus} from "../../models/computer/Computer.model";
import computerRepository from "../computer/Computer.repository.mock";

// id?: string;
// start: Date;
// end: Date;
// deposit: DepositState;
// loanType: LoanType;
// loanStatus: LoanStatus;
// course?: Course;
// student?: Student;
// computer: Computer;

const loans: Loan[] = [
    {
        id: "1",
        startDate: new Date("2023-04-01"),
        endDate: new Date("2023-06-30"),
        deposit: DepositState.UNNECESSARY,
        loanType: LoanType.COLLECTIVE,
        loanStatus: LoanStatus.IN_PROGRESS,
        computer: {
            id: "1",
            serialNumber: "ABCDEFG",
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
        course: {
            id: "2",
            label: "IDP Angular",
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-06-30"),
            place: "Inicio - Arobase"
        }
    },
    {
        id: "2",
        startDate: new Date("2023-04-01"),
        endDate: new Date("2023-06-30"),
        deposit: DepositState.UNNECESSARY,
        loanType: LoanType.COLLECTIVE,
        loanStatus: LoanStatus.IN_PROGRESS,
        computer: {
            id: "2",
            serialNumber: "HIJKLMN",
            category: "Admin",
            ram: "32GB",
            processor: "i7",
            condition: "Neuf",
            comments: []
        },
        course: {
            id: "2",
            label: "IDP Angular",
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-06-30"),
            place: "Inicio - Arobase"
        }
    },
    {
        id: "2",
        startDate: new Date("2023-04-01"),
        endDate: new Date("2023-06-30"),
        deposit: DepositState.UNNECESSARY,
        loanType: LoanType.COLLECTIVE,
        loanStatus: LoanStatus.IN_PROGRESS,
        computer: {
            id: "3",
            serialNumber: "OPQRSTU",
            category: "Bureautique",
            ram: "8GB",
            processor: "i3",
            condition: null,
            comments: []
        },
        course: {
            id: "2",
            label: "IDP Angular",
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-06-30"),
            place: "Inicio - Arobase"
        }
    },
    {
        id: "2",
        startDate: new Date("2023-04-01"),
        endDate: new Date("2023-06-30"),
        deposit: DepositState.PAID,
        loanType: LoanType.INDIVIDUAL,
        loanStatus: LoanStatus.IN_PROGRESS,
        student: {
            id: "3",
            firstName: "Jack",
            lastName: "Angular",
            course: {
                id: "5",
                label: "POE React",
                startDate: new Date("2023-04-01"),
                endDate: new Date("2023-06-30"),
                place: "Salle 3"
            }
        },
        computer: {
            id: "4",
            serialNumber: "VWXYZAB",
            category: null,
            ram: null,
            processor: null,
            condition: null,
            comments: []
        }
    }
]

class LoanRepositoryMock {

    findAll(): Promise<Loan[]> {
        return Promise.resolve(loans);
    }

    findById(id: string): Promise<Loan> {
        let loan = loans.find(loan => loan.id === id);
        if (loan) {
            return Promise.resolve(loan);
        }
        return Promise.reject(`Loan with id ${id} not found`);
    }

    findByStudentId(id: string): Promise<Loan[]> {
        let loan = loans.filter(loan => loan.student?.id === id);
        if (loan) {
            return Promise.resolve(loan);
        }
        return Promise.reject(`Loan with student id ${id} not found`);
    }

    findByComputerId(id: string): Promise<Loan[]> {
        let loan = loans.filter(loan => loan.computer?.id === id);
        if (loan) {
            return Promise.resolve(loan);
        }
        return Promise.reject(`Loan with computer id ${id} not found`);
    }

    findByCourseId(id: string): Promise<Loan[]> {
        let loan = loans.filter(loan => loan.course?.id === id);
        if (loan) {
            return Promise.resolve(loan);
        }
        return Promise.reject(`Loan with course id ${id} not found`);
    }

    save(loan: Loan): Promise<Loan> {
        let duplicatedLoan = loans.find(l => l.computer.id === loan.computer.id && l.loanStatus === LoanStatus.IN_PROGRESS && l.course?.id === loan.course?.id);
        let index = loans.findIndex(l => l.computer.id === loan.computer.id && l.loanStatus === LoanStatus.IN_PROGRESS);
        if (duplicatedLoan) {
            throw new Error(`Loan with id ${duplicatedLoan.id} already exists`);
        }
        if (index !== -1) {
            const oldLoan = loans[index];
            oldLoan.loanStatus = LoanStatus.FINISHED;
            oldLoan.endDate = new Date();
            loans[index] = oldLoan;
        }
        loan.id = (loans.length + 1).toString();
        loans.push(loan);
        return Promise.resolve(loan);
    }

    replace(loan: Loan): Promise<Loan> {
        let index = loans.findIndex(l => l.id === loan.id);
        if (index !== -1) {
            loans[index] = loan;
            return Promise.resolve(loan);
        }
        return Promise.reject(`Loan with id ${loan.id} not found`);
    }

    delete(id: string): Promise<Loan> {
        let index = loans.findIndex(l => l.id === id);
        if (index !== -1) {
            return Promise.resolve(loans.splice(index, 1)[0]);
        }
        return Promise.reject(`Loan with id ${id} not found`);
    }

    endLoan(id: string): Promise<Loan> {
        let index = loans.findIndex(l => l.id === id);
        if (index !== -1) {
            const loan = loans[index];
            loan.loanStatus = LoanStatus.FINISHED;
            loan.endDate = new Date();
            loans[index] = loan;

            loan.computer.id && computerRepository.findById(loan.computer.id).then(computer => {
                computer.status = ComputerStatus.AVAILABLE;
                computerRepository.replace(computer);
            })

            return Promise.resolve(loan);
        }
        return Promise.reject(`Loan with id ${id} not found`);
    }

}

export default new LoanRepositoryMock();