import React, {useEffect} from 'react';
import computerService from "../../services/computer/Computer.service";
import {Computer} from "../../models";

const useComputer = (serial: string) => {

    const [computer, setComputer] = React.useState<Computer | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        if (serial !== computer?.serial) {
            setIsLoading(true);
            setComputer(null);
            computerService.findComputerBySerial(serial).then((computer) => {
                setComputer(computer);
            }).catch((e) => {
                setError(e.message)
            }).finally(() => setIsLoading(false));
        }
    }, [serial]);


    return {computer, isLoading, error};
};

export default useComputer;