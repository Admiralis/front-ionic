import Course from "../course/Course.model";
import Computer from "../computer/Computer.model";
import Student from "../student/Student.model";
import {DepositState} from "./DepositState";
import {LoanType} from "./LoanType";
import {LoanStatus} from "./LoanStatus";

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