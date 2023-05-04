import {Computer, NewComputer} from "../../models";
import {useEffect, useState} from "react";
import computerService from "../../services/computer/Computer.service";

/**
 * Hook pour gérer les states des ordinateurs
 */
const useComputers = () => {
    const [computers, setComputers] = useState<Computer[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getComputers()
    }, [])

    const getComputers = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const computers = await computerService.findComputers()
            setComputers(computers)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * Ajoute un ordinateur à la liste
     * @param newComputer l'ordinateur à ajouter
     */
    const addComputer = async (newComputer: NewComputer) => {
        try {
            setIsLoading(true)
            setError(null)
            const savedComputer: Computer = await computerService.saveComputer(newComputer)
            setComputers([...computers, savedComputer])
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {computers: computers, isLoading, error, addComputer}
}

export default useComputers