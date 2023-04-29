import React from 'react';
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
            <AsciiInputComponent
                label="Formation"
                value={loan.course?.label || ''}
            />
            <AutocompleteCourseInputComponent />
            <AsciiDatePickerComponent label="Date début" value={loan.course?.startDate || new Date()}
                                      onChange={(loan) => {
                                          setLoan({
                                              ...loan,
                                              startDate: new Date(loan.startDate)
                                          })
                                      }}/>
            <AsciiDatePickerComponent label="Date fin" value={loan.course?.endDate || null} onChange={(loan) => {
                setLoan({
                    ...loan,
                    endDate: new Date(loan.endDate)
                })
            }}/>
        </>
    );
}

export default IndividualLoanFormComponent;