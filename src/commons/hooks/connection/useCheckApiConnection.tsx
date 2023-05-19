import React from 'react';

/**
 * Vérifie la connection à l'API.
 * Ne vérifie que l'API des prêts car il n'est pas nécessaire en l'état de vérifier les autres.
 */
function useCheckApiConnection() {
    const [isLoanApiConnected, setLoanApiConnected] = React.useState<boolean>(!!localStorage.getItem('ip'));
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [ip, setIp] = React.useState<string>(localStorage.getItem('ip') || '');


    function testConnection() {
        setLoading(true);
        setLoanApiConnected(false);

        fetch(`http://${ip}/api/loans/status/health`).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('ip', ip);
                setLoanApiConnected(true);
                setLoading(false)
            }
        }).catch(() => {
            setLoading(false)
        });
    }

    React.useEffect(() => {
        if (!localStorage.getItem('ip')) {
            ip && testConnection()
        } else {
            setIp(localStorage.getItem('ip') || '');
            setLoanApiConnected(true);
        }
    }, [ip])

    return {
        isLoanApiConnected,
        setLoanApiConnected,
        isLoading,
        ip,
        setIp
    }

}

export default useCheckApiConnection;