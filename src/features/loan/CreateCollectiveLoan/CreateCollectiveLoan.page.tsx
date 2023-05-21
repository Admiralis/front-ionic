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
    const [toastColor, setToastColor] = React.useState('success')

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

    const handleCancel = () => {
        router.push(origin, {reScan: true});
    };

    const handleSubmitAndReScan = async (e: any) => {
        e.preventDefault();
        try {
            await addLoan(loan)
            showToaster(!!error)
            !error && router.push(origin, {reScan: true})
        } catch (e) {
            showToaster(true)
        } finally {
            setComputer({} as Computer)
        }

    }

    const handleSubmitAndFinish = async (e: any) => {
        e.preventDefault();
        try {
            await addLoan(loan)
            showToaster(!!error)
            if (!error) {
                router.push("/scan/menu")
            }
        } catch (e) {
            showToaster(true)
        } finally {
            setComputer({} as Computer)
            setLoan({} as Loan)
            setCourse({} as Course)
        }
    }

    const showToaster = (error: boolean) => {
        if (error) {
            setToastMessage("Une erreur est survenue. Vérifiez la connection à l'API")
            setToastColor("danger")
            setIsToastOpen(true)
        } else {
            setToastMessage("Prêt ajouté")
            setToastColor("success")
            setIsToastOpen(true)
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
                                computer={computer}
                                setComputer={setComputer}
                            />
                        }
                    />
                    <CardComponent
                        tiny
                        title="Actions"
                        content={
                            <div>
                                <IonButton
                                    className="yellow"
                                    expand="block"
                                    onClick={async (event) => await handleSubmitAndFinish(event)}
                                >
                                    Terminer
                                </IonButton>
                                <div>
                                    <IonButton className="red" onClick={handleCancel}>
                                        Annuler
                                    </IonButton>
                                    <IonButton
                                        className="green"
                                        onClick={async (event) => {await handleSubmitAndReScan(event)}}
                                    >
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
                color={toastColor}
            />
        </IonPage>
    );
};

export default CreateCollectiveLoanPage;
