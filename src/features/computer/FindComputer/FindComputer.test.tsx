import React from 'react';
import {act, render} from '@testing-library/react';
import FindComputerPage from "./FindComputer.page";
import { mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {ComputerService} from "../../../commons/services/computer";

import {Computer} from "../../../commons/models";


describe('FindComputerPage', () => {

    let useState: jest.SpyInstance;
    let useHistory: jest.SpyInstance;
    let UnknownComputerModalComponent: jest.SpyInstance;
    let ComputerServiceMock: jest.SpyInstance;

    beforeEach(() => {
        mockIonicReact();
        jest.spyOn(require('react-router'), 'useLocation')
            .mockImplementation(() => ({
                pathname: '/scan/edit-computer',
            }));
        useHistory = jest.spyOn(require('react-router'), 'useHistory')
            .mockImplementation(() => ({
                push: jest.fn(),
            }))
        useState = jest.spyOn(React, 'useState');
        useState.mockImplementation((init) => [init, jest.fn(() => init)]);
        UnknownComputerModalComponent = jest.spyOn(require('commons/components/Modals/UnknownComputerModal/UnknownComputerModal.component'), 'default')
            .mockImplementation(() => <div/>);
        ComputerServiceMock = jest.spyOn(ComputerService, 'findComputerBySerial').mockImplementation(() => Promise.resolve({} as Computer));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render', async () => {
        const {container} = render(<FindComputerPage/>);
        await waitForIonicReact();
        expect(container).toBeTruthy();
    });

    it('should submit', async () => {
        const {container} = render(<FindComputerPage/>);
        await waitForIonicReact();
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form');
        await act(async () => {
            await form?.dispatchEvent(new Event('submit'));
        });
        expect(useHistory).toHaveBeenCalled();
    });

    it('should open modal', async () => {
        ComputerServiceMock.mockImplementation(() => Promise.reject());
        const {container} = render(<FindComputerPage/>);
        await waitForIonicReact();
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form');
        await act(async () => {
            await form?.dispatchEvent(new Event('submit'));
        });
        expect(UnknownComputerModalComponent).toHaveBeenCalled();
    });

});