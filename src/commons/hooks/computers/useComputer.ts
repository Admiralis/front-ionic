import React, {useEffect} from 'react';
import computerService from "../../services/computer/Computer.service";
import {Computer} from "../../models";

const useComputer = (serialNumber: string) => {

    const [computer, setComputer] = React.useState<Computer | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        if (serialNumber !== computer?.serialNumber) {
            (async () => {
                try {
                    setIsLoading(true);
                    setComputer(null);
                    const computer = await computerService.findComputerBySerial(serialNumber);
                    setComputer(computer);
                } catch (e: any) {
                    setError(e.message);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serialNumber]);


    return {computer, isLoading, error};
};

export default useComputer;