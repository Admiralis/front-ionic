import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {useHistory, useLocation} from "react-router";
import {Computer, Course} from "../../../commons/models";
import {EditComputerComponent} from "../../computer/EditComputer/components/EditComputer.component";
import {CardComponent, SimpleModalComponent} from "../../../commons/components";
import CourseFormComponent from "../../../commons/components/Forms/CourseForm/CourseForm.component";
import Loan from "../../../commons/models/loan/Loan.model";
import {DepositState} from "../../../commons/models/loan/DepositState";
import {LoanStatus} from "../../../commons/models/loan/LoanStatus";
import {LoanType} from "../../../commons/models/loan/LoanType";
import useLoans from "../../../commons/hooks/loans/useLoans";
import {add} from "ionicons/icons";

const CreateCollectiveLoanPage = () => {

    const [computer, setComputer] = useState({} as Computer);
    const [course, setCourse] = useState({} as Course);
    const [loan, setLoan] = useState({} as Loan)
    const [showModal, setShowModal] = useState(false);

    const router = useHistory();
    const location = useLocation<{ comeFrom: string, newComputerState: Computer, newCourseState: Course }>();
    const {addLoan, error} = useLoans()

    useEffect(() => {
        if (!location.state) {
            return;
        }

        if (location.state.newComputerState) {
            setComputer(location.state.newComputerState);
        }

        if (location.state.newCourseState) {
            setCourse(location.state.newCourseState);
        }

    }, [location.state]);

    useEffect(() => {
        setLoan({
            start: course.startDate,
            end: course.endDate ? course.endDate : undefined,
            deposit: DepositState.UNNECESSARY,
            loanStatus: LoanStatus.IN_PROGRESS,
            loanType: LoanType.COLLECTIVE,
            course: course,
            computer: computer
        })
    }, [computer, course])

    useEffect(() => {
        error && setShowModal(true)
    }, [error])

    const handleCancel = () => {
        router.push(location.state.comeFrom, {reScan: true});
    };

    const handleSubmitAndReScan = (e: any) => {
        e.preventDefault();
        addLoan(loan)
        router.push(location.state.comeFrom, {reScan: true});
    }

    const handleSubmitAndFinish = (e: any) => {
        e.preventDefault();
        router.push(location.state.comeFrom);
    }

    return (
        <IonPage>
            <IonContent>
                <form className="flex-container">
                    <CardComponent
                        tiny
                        title="Prêt collectif"
                        content={
                            <div>
                                <CourseFormComponent
                                    newCourseInfo={course}
                                    setNewCourseInfo={setCourse}
                                />
                            </div>
                        }
                    />
                    <CardComponent
                        tiny
                        title="Ordinateur"
                        content={
                            <EditComputerComponent
                                newComputerInfo={computer}
                                setNewComputerInfo={setComputer}
                            />
                        }
                    />
                    <CardComponent
                        tiny
                        title="Actions"
                        content={
                            <div>
                                <IonButton className="yellow large"
                                           expand="block"
                                           onClick={handleSubmitAndFinish}>
                                    Terminer
                                </IonButton>
                                <div>
                                    <IonButton className="red" onClick={handleCancel}>
                                        Annuler
                                    </IonButton>
                                    <IonButton className="green" onClick={handleSubmitAndReScan}>
                                        PC Suivant
                                    </IonButton>
                                </div>
                            </div>
                        }
                    />
                </form>
            </IonContent>
            <SimpleModalComponent
                isOpen={showModal}
                setIsOpen={setShowModal}
                title="Oops"
                content={
                <p>{error}</p>
            }
            />
        </IonPage>
    );
};

export default CreateCollectiveLoanPage;
