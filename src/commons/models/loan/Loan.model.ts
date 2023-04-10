import Course from "../course/Course.model";
import Computer from "../computer/Computer.model";
import Student from "../student/Student.model";

enum DepositState {
    'PENDING' = 'PENDING',
    'PAID' = 'PAID',
    'REFUNDED' = 'NOT_PAID',
}

enum LoanType {
    'INDIVIDUAL' = 'INDIVIDUAL',
    'COLLECTIVE' = 'COLLECTIVE',
}

enum LoanStatus {
    'IN_PROGRESS' = 'IN_PROGRESS',
    'FINISHED' = 'FINISHED',
    'CANCELLED' = 'CANCELLED',
}

interface Loan {
    id?: string;
    start: Date;
    end: Date;
    deposit: DepositState;
    loanType: LoanType;
    loanStatus: LoanStatus;
    course?: Course;
    student?: Student;
    computer: Computer;


}

export default Loan;