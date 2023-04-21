import React, {useEffect} from 'react';
import LoanService from "../../services/loan/Loan.service";
import Loan from "../../models/loan/Loan.model";

/**
 * Hook permettant de récupérer la liste des prêts et d'en ajouter
 */
const useLoans = () => {

    const [loans, setLoans] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [loan, setLoan] = React.useState<any>(null);



    const addLoan = (loan: any) => {
        setIsLoading(true);
        LoanService.saveLoan(loan).then(loan => {
            setError(null);
            setLoans([...loans, loan]);
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const endLoan = (loan: any) => {
        setIsLoading(true);
        LoanService.endLoan(loan).then(loan => {
            setError(null);
            getLoans();
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const getLoans = () => {
        LoanService.findLoans().then(loans => {
            setError(null);
            loans.forEach((loan: Loan) => {
                loan.startDate = new Date(loan.startDate);
                loan.endDate = loan.endDate ? new Date(loan.endDate) : undefined;
                loan.course?.startDate && (loan.course.startDate = new Date(loan.course.startDate));
                loan.course?.endDate && (loan.course.endDate = new Date(loan.course.endDate));
            })
            setLoans(loans);
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getLoans();
    }, [])

    return {loans, isLoading, error, addLoan, endLoan}

};

export default useLoans;