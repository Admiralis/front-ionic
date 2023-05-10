import React, {useEffect} from 'react';
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
    const today = new Date();

    function computeStartDate() {
        return loan.course?.startDate && new Date(loan.course.startDate) > today ? new Date(loan.course.startDate) : today;
    }

    React.useEffect(() => {

        if (loan.course?.endDate) {
            setLoan({
                ...loan,
                startDate: computeStartDate(),
                endDate: new Date(loan.course.endDate),
            })
        } else {
            setLoan({
                ...loan,
                startDate: computeStartDate(),
                endDate: undefined,
            })
        }
        //eslint-disable-next-line
    }, [loan.course])

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
                label="Début prêt"
                value={loan.startDate}
                onChange={(event) => {
                    setLoan({
                        ...loan,
                        startDate: new Date(event.detail.value!)
                    })
                }}
            />
            <AsciiDatePickerComponent
                label="Fin prêt"
                min={today.toISOString()}
                max={loan.course?.endDate ? new Date(loan.course.endDate).toISOString() : new Date(today.getFullYear() + 3, today.getMonth(), today.getDate()).toISOString()}
                value={loan?.endDate || null}
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