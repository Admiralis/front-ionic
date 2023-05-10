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


    /**
     * Ajoute un prêt
     * @param loan
     */
    const addLoan = async (loan: any) => {
        try {
            setIsLoading(true);
            setError(null);
            const savedLoan: Loan = await LoanService.saveLoan(loan);
            setLoans([...loans, savedLoan]);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Termine un prêt
     * @param loan
     */
    const endLoan = async (loan: any) => {
        try {
            setIsLoading(true);
            setError(null);
            await LoanService.endLoan(loan);
            await getLoans();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Récupère la liste des prêts
     */
    const getLoans = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const loans = await LoanService.findLoans();
            setLoans(loans);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await getLoans();
        })()
    }, [])

    return {loans: loans, isLoading, error, addLoan, endLoan}

};

export default useLoans;