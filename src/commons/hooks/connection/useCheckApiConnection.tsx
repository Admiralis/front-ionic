import React from 'react';
import useStorage from "../storage/useStorage";

/**
 * Vérifie la connection à l'API.
 * Ne vérifie que l'API des prêts car il n'est pas nécessaire en l'état de vérifier les autres.
 */
function useCheckApiConnection() {
    const {storage} = useStorage();
    const [isConnected, setConnected] = React.useState<boolean>(false);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [ip, setIp] = React.useState<string>('');


    async function testConnection() {

        setLoading(true);

        fetch(`http://${ip}/api/loans/status/health`)
            .then((response) => {
                if (response.status === 200) {
                    (async () => {
                        await storage.set('ip', ip)
                        await storage.set('isConnected', true)
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
            !isConnected && ip && await testConnection();
        })();
    }, [ip])

    React.useEffect(() => {
        (async () => {
            const ip = await storage.get('ip');
            const isConnected = await storage.get('isConnected');
            setIp(ip);
            setConnected(isConnected);
        })();
    }, [])


    return {
        isConnected,
        setConnected,
        isLoading,
        setIp,
        ip
    }

}

export default useCheckApiConnection;