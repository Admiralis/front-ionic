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
        computerService.findComputers().then((computers) => {
            setError(null)
            setComputers(computers)
            setIsLoading(false)
        }).catch((e) => {
            setError(e.message)
            setIsLoading(false)
        })
    }, [])

    /**
     * Ajoute un ordinateur à la liste
     * @param newComputer l'ordinateur à ajouter
     */
    const addComputer = (newComputer: NewComputer) => {
        setIsLoading(true)
        computerService.saveComputer(newComputer).then((newComputer) => {
            setError(null)
            setComputers([...computers, newComputer])
        }).catch((e) => {
            setError(e.message)
        }).finally(() => setIsLoading(false))
    }

    return {computers, isLoading, error, addComputer}
}

export default useComputers