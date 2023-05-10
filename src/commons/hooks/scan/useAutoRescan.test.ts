import {act, renderHook} from '@testing-library/react'

import useAutoRescan from "./useAutoRescan";

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        state: undefined
    })
}));

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