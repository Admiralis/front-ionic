/* Wrapper */
import {withConnectionStatus} from "../commons/hocs/withConnectionStatus/withConnectionStatus.hoc";

/*Scan*/
import ScanMenuPage from "./computer/ScanMenu/ScanMenu.page";

/*Computers*/
import AddComputerPage from "./computer/AddComputer/AddComputer.page";
import EditComputerPage from "./computer/EditComputer/EditComputer.page";
import FindComputerPage from "./computer/FindComputer/FindComputer.page";

/*Courses*/
import AddCoursePage from "./course/AddCourse/AddCourse.page";

/*Loans*/
import CreateCollectiveLoanPage from "./loan/CreateCollectiveLoan/CreateCollectiveLoan.page";
import CreateIndividualLoanPage from "./loan/CreateIndividualLoan/CreateIndividualLoan.page";
import EditIndividualLoanPage from "./loan/EditIndividualLoan/EditIndividualLoan.page";
import EndLoanPage from "./loan/EndLoan/EndLoan.page";

const WRAPPED_PAGES = {
    scanMenu: withConnectionStatus(ScanMenuPage),
    addComputer: withConnectionStatus(AddComputerPage),
    editComputer: withConnectionStatus(EditComputerPage),
    findComputer: withConnectionStatus(FindComputerPage),
    addCourse: withConnectionStatus(AddCoursePage),
    createCollectiveLoan: withConnectionStatus(CreateCollectiveLoanPage),
    createIndividualLoan: withConnectionStatus(CreateIndividualLoanPage),
    editIndividualLoan: withConnectionStatus(EditIndividualLoanPage),
    endLoan: withConnectionStatus(EndLoanPage),
}

export default WRAPPED_PAGES;
