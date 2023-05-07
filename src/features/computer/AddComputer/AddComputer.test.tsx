import React from 'react';
import { render, screen} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import AddComputerPage from "./AddComputer.page";

describe('AddComputerPage', () => {

    let useLocation: jest.SpyInstance;
    let useAutoRescan: jest.SpyInstance;
    jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useState: jest.fn()
    }))

    beforeEach(() => {
        mockIonicReact();
        useAutoRescan = jest.spyOn(require('commons/hooks/scan/useAutoRescan'), 'default');
        useAutoRescan.mockReturnValue({autoScan: false});
        useLocation = jest.spyOn(require('react-router'), 'useLocation');
        useLocation.mockReturnValue({state: {reScan: false}});
    });

    it('should render without autoScan', async () => {
        const {container} = await render(<AddComputerPage/>);
        await waitForIonicReact()
        expect(container).toBeDefined();
    });

    it('should render with autoScan', async () => {
        const {container} = await render(<AddComputerPage/>);
        await waitForIonicReact()
        expect(container).toBeDefined();
    });

    it('should not be submittable if serial number is empty', async () => {
        await render(<AddComputerPage/>);
        await waitForIonicReact()
        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeDisabled();
    });

});