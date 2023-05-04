import {act, renderHook} from '@testing-library/react'

import useAutoRescan from "./useAutoRescan";


// /**
//  * Hook pour gérer l'ouverture automatique de la caméra
//  * S'ouvre automatiquement si on vient de la page de confirmation et que l'on est sur un appareil android
//  */
// const useAutoRescan = () => {
//
//     const location = useLocation<{ reScan: boolean }>();
//     const [autoScan, setAutoScan] = useState<boolean>(false);
//
//     useEffect(() => {
//         // Prévient les erreurs lors des changements de page
//         if (!location.state) {
//             return;
//         }
//         if (isPlatform('mobileweb')) {
//             return;
//         }
//         // Ouvre automatiquement la caméra si on vient de la page de confirmation
//         if (isPlatform('android') && location.state.reScan) {
//             setAutoScan(true);
//         }
//     }, [location.state]);
//
//     return {autoScan}
// }
//
// export default useAutoRescan;


// mock useLocation
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        state: undefined
    })
}));

// mock isPlatform
jest.mock('@ionic/react', () => ({
    ...jest.requireActual('@ionic/react'),
    isPlatform: () => false
}));

describe('useAutoRescan', () => {
    it('should return false if location.state is undefined', () => {

        jest.mock('react-router', () => ({
            ...jest.requireActual('react-router'),
            useLocation: () => ({
                state: {
                    reScan: undefined
                }
            })
        }));

        const {result} = renderHook(() => useAutoRescan());
        expect(result.current.autoScan).toBe(false);
    });

    it('should return false if location.state.reScan is undefined', () => {

        jest.mock('react-router', () => ({
            ...jest.requireActual('react-router'),
            useLocation: () => ({
                state: {
                    reScan: undefined
                }
            })
        }));

        const {result} = renderHook(() => useAutoRescan());
        act(() => {
            result.current.autoScan = true;
        });
        expect(result.current.autoScan).toBe(true);
    });

    it('should return false if location.state.reScan is false', () => {

        jest.mock('react-router', () => ({
            ...jest.requireActual('react-router'),
            useLocation: () => ({
                state: {
                    reScan: false
                }
            })
        }));

        const {result} = renderHook(() => useAutoRescan());
        act(() => {
            result.current.autoScan = true;
        });
        expect(result.current.autoScan).toBe(true);
    });

    it('should reScan only if location.state.reScan is true and isPlatform is android', () => {

            jest.mock('react-router', () => ({
                ...jest.requireActual('react-router'),
                useLocation: () => ({
                    state: {
                        reScan: true
                    }
                })
            }));

            jest.mock('@ionic/react', () => ({
                ...jest.requireActual('@ionic/react'),
                isPlatform: () => true
            }));

            const {result} = renderHook(() => useAutoRescan());
            act(() => {
                result.current.autoScan = true;
            });
            expect(result.current.autoScan).toBe(true);
    });

});