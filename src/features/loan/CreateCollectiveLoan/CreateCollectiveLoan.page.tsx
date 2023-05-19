import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonPage, IonToast} from "@ionic/react";
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

/**
 * Page de création d'un prêt collectif
 * @constructor
 */
const CreateCollectiveLoanPage = () => {

    const [computer, setComputer] = useState({} as Computer);
    const [course, setCourse] = useState({} as Course);
    const [loan, setLoan] = useState({} as Loan)
    const [showModal, setShowModal] = useState(false);
    const [origin, setOrigin] = useState<string>('');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

    const router = useHistory();
    const location = useLocation<{ comeFrom: string, computer: Computer, course: Course }>();
    const {addLoan, error} = useLoans()

    useEffect(() => {
        if (!location.state) {
            return;
        }

        if (location.state.computer) {
            setComputer(location.state.computer);
        }

        if (location.state.course) {
            setCourse(location.state.course);
        }

        setOrigin(location.state.comeFrom)

    }, [location.state]);

    useEffect(() => {
        setLoan({
            startDate: course.startDate,
            endDate: course.endDate ? course.endDate : undefined,
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
        router.push(origin, {reScan: true});
    };

    const handleSubmitAndReScan = async (e: any) => {
        e.preventDefault();
        try {
            await addLoan(loan)
            setToastMessage("Prêt ajouté")
            setIsToastOpen(true)
            router.push(origin, {reScan: true})

        } catch (e) {
            console.log(e)
        }

    }

    const handleSubmitAndFinish = async (e: any) => {
        e.preventDefault();
        try {
            await addLoan(loan)
            setToastMessage("Prêt ajouté")
            setIsToastOpen(true)
            router.push("/")
        } catch (e) {
            console.log(e)
        }
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
                                           onClick={async (event) => await handleSubmitAndFinish(event)}>
                                    Terminer
                                </IonButton>
                                <div>
                                    <IonButton className="red" onClick={handleCancel}>
                                        Annuler
                                    </IonButton>
                                    <IonButton className="green" onClick={async (event) => {await handleSubmitAndReScan(event)}}>
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
            <IonToast
                isOpen={isToastOpen}
                onDidDismiss={() => setIsToastOpen(false)}
                message={toastMessage}
                duration={3000}
            />
        </IonPage>
    );
};

export default CreateCollectiveLoanPage;
