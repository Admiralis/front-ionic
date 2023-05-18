import React from 'react';

function useCheckApiConnection() {
    const [isComputerApiConnected, setComputerApiConnected] = React.useState<boolean>(false);
    const [isCourseApiConnected, setCourseApiConnected] = React.useState<boolean>(false);
    const [isLoanApiConnected, setLoanApiConnected] = React.useState<boolean>(false);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [ip, setIp] = React.useState<string>(localStorage.getItem('ip') || '');
    // const ip = localStorage.getItem('ip') || '';

    function testConnection() {

        setLoading(true);

        fetch(`http://${ip}/api/loans/status/health`).then((response) => {
            if (response.status === 200) {
                setLoanApiConnected(true);
                setLoading(false)
            }
        }).catch((error) => {
            setLoanApiConnected(false);
            setLoading(false)
        });

        fetch(`http://${ip}/api/courses/status/health`).then((response) => {
            if (response.status === 200) {
                setCourseApiConnected(true);
                setLoading(false)
            }
        }).catch((error) => {
            setCourseApiConnected(false);
            setLoading(false)
        });

        fetch(`http://${ip}/api/computers/status/health`).then((response) => {
            if (response.status === 200) {
                setComputerApiConnected(true);
                setLoading(false)
            }
        }).catch((error) => {
            setComputerApiConnected(false);
            setLoading(false)
        });
    }

    React.useEffect(() => {
        localStorage.setItem('ip', ip);
        testConnection();
    }, [ip])

    return {
        isComputerApiConnected,
        setComputerApiConnected,
        isCourseApiConnected,
        setCourseApiConnected,
        isLoanApiConnected,
        setLoanApiConnected,
        isLoading,
        ip,
        setIp
    }

}

export default useCheckApiConnection;