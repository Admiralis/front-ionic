import {Computer, NewComputer} from "../../models";
import {useEffect, useState} from "react";
import computerService from "../../services/computer/Computer.service";

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

    const addComputer = (newComputer: NewComputer) => {
        computerService.saveComputer(newComputer).then((newComputer) => {
            setError(null)
            setComputers([...computers, newComputer])
        }).catch((e) => {
            setError(e.message)
        })
    }

    return {computers, isLoading, error, addComputer}
}

export default useComputers