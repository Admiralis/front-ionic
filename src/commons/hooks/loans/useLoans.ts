import React, {useEffect} from 'react';
import LoanService from "../../services/loan/Loan.service";

const useLoans = () => {

    const [loans, setLoans] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        LoanService.findLoans().then(loans => {
            setError(null);
            setLoans(loans);
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [])

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

    return {loans, isLoading, error, addLoan}

};

export default useLoans;