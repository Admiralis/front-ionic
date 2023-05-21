import React from 'react';
import useStorage from "../storage/useStorage";
import {useHistory} from "react-router";
import ComputerRepository from "../../services/computer/Computer.repository";
import CourseRepository from "../../services/course/Course.repository";
import LoanRepository from "../../services/loan/Loan.repository";

/**
 * Vérifie la connection à l'API.
 * Ne vérifie que l'API des prêts car il n'est pas nécessaire en l'état de vérifier les autres.
 */
function useCheckApiConnection() {
    const {storage} = useStorage();
    const [isConnected, setConnected] = React.useState<boolean>(false);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [ip, setIp] = React.useState<string>('');
    const router = useHistory();

    async function testConnection() {

        setLoading(true);

        fetch(`http://${ip}/api/loans/status/health`)
            .then((response) => {
                if (response.status === 200) {
                    (async () => {
                        await storage.set('ip', ip)
                        await storage.set('isConnected', true)
                        ComputerRepository.url = `http://${ip}/api/computers`
                        CourseRepository.url = `http://${ip}/api/courses`
                        LoanRepository.url = `http://${ip}/api/loans`
                    })()
                    setConnected(true);
                }
            })
            .catch(() => {
                setConnected(false);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    React.useEffect(() => {
        (async () => {
            ip && await testConnection();
        })();
    }, [ip])

    React.useEffect(() => {
        (async () => {
            const ip = await storage.get('ip');
            const isConnected = await storage.get('isConnected');
            setIp(ip);
            setConnected(isConnected);
            if (!isConnected) router.push('/settings')
        })();
    }, [])


    return {
        isConnected,
        isLoading,
        setIp,
        ip
    }

}

export default useCheckApiConnection;