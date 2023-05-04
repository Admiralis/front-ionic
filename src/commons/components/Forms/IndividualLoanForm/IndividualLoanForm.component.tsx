import React, {useState} from 'react';
import {AsciiInputComponent} from "../Inputs/AsciiInput/AsciiInput.component";
import {AsciiDatePickerComponent} from "../Inputs/AsciiDate/AsciiDate.component";
import Loan from "../../../models/loan/Loan.model";
import AutocompleteCourseInputComponent from "../Inputs/AutocompleteCourseInput/AutocompleteCourseInput.component";

interface IndividualLoanComponentProps {
    loan: Loan;
    setLoan: (newIndividualLoanInfo: Loan) => void;
}

function IndividualLoanFormComponent(props: IndividualLoanComponentProps) {

    const {loan = {} as Loan, setLoan} = props;
    const [startDate, setStartDate] = useState<Date>(new Date());

    return (
        <>
            <AsciiInputComponent
                label="Nom"
                value={loan.student?.firstName || ''}
                onIonChange={(event) => {
                    setLoan({
                            ...loan,
                            student: {
                                ...loan.student,
                                firstName: event.detail.value!
                            }
                        } as Loan
                    )
                }}
                required
            />
            <AsciiInputComponent
                label="Prénom"
                value={loan.student?.lastName || ''}
                onIonChange={(event) => {
                    setLoan({
                        ...loan,
                        student: {
                            ...loan.student,
                            lastName: event.detail.value!
                        }
                    } as Loan)
                }}
                required
            />
            <AutocompleteCourseInputComponent
                course={loan.course}
                setCourse={(newCourse) => {
                    setLoan({
                        ...loan,
                        course: newCourse
                    })
                }}
            />
            <AsciiDatePickerComponent
                label="Date début"
                // value={loan.course?.startDate ? new Date(loan.course?.startDate) : new Date()}
                value={loan?.startDate ? new Date(loan.startDate) : loan.course?.startDate ? new Date (loan.course.startDate) : startDate}
                onChange={(event) => {
                    const newStartDate = new Date(event.detail.value!);
                    setLoan({
                        ...loan,
                        startDate: new Date(newStartDate)
                    })
                    setStartDate(new Date(newStartDate));
                }}
            />
            <AsciiDatePickerComponent
                label="Date fin"
                min={startDate.toISOString()}
                max={loan.course?.endDate ? new Date(loan.course.endDate).toISOString() : new Date(startDate.getFullYear() + 3, startDate.getMonth(), startDate.getDate()).toISOString()}
                value={loan?.endDate ? new Date(loan.endDate) : loan.course?.endDate ? new Date (loan.course.endDate) : null}
                onChange={(event) => {
                    setLoan({
                        ...loan,
                        endDate: new Date(event.detail.value!)
                    })
                }}
            />
        </>
    );
}

export default IndividualLoanFormComponent;