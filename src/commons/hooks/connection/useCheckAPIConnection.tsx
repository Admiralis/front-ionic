import React from 'react';

function UseCheckApiConnection() {
    const [isComputerApiConnected, setComputerApiConnected] = React.useState<boolean>(false);
    const [isCourseApiConnected, setCourseApiConnected] = React.useState<boolean>(false);
    const [isLoanApiConnected, setLoanApiConnected] = React.useState<boolean>(false);

    const ip = localStorage.getItem('ip') || '';

    function testConnection() {

        fetch(`http://${ip}/api/loans`).then((response) => {
            if (response.status === 200) {
                setLoanApiConnected(true);
            }
        }).catch((error) => {
            setLoanApiConnected(false);
        });

        fetch(`http://${ip}/api/courses`).then((response) => {
            if (response.status === 200) {
                setCourseApiConnected(true);
            }
        }).catch((error) => {
            setCourseApiConnected(false);
        });

        fetch(`http://${ip}/api/computers`).then((response) => {
            if (response.status === 200) {
                setComputerApiConnected(true);
            }
        }).catch((error) => {
            setComputerApiConnected(false);
        });
    }

    React.useEffect(() => {
        testConnection();
    }, [ip])

    React.useEffect(() => {
        testConnection();
    },  [])

    const refetch = () => {
        testConnection();
    }

    return {
        isComputerApiConnected,
        isCourseApiConnected,
        isLoanApiConnected,
        refetch
    }

}

export default UseCheckApiConnection;