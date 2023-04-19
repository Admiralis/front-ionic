import React, {useEffect} from 'react';
import LoanService from "../../services/loan/Loan.service";

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
            setLoans(loans);
            console.log(loans)
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        LoanService.findLoans().then(loans => {
            setError(null);
            setLoans(loans);
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [endLoan])

    return {loans, isLoading, error, addLoan, endLoan}

};

export default useLoans;