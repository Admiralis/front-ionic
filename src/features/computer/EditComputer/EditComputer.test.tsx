import React from 'react';
import {act, render} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {Computer, NewComputer} from "../../../commons/models";
import EditComputerPage from "./EditComputer.page";

describe('EditComputerPage', () => {
    let useLocationMock: jest.SpyInstance;

    jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useState: jest.fn()
    }))

    const newComputerInfoMock: NewComputer = {
        category: 'Laptop',
        comments: [],
        condition: 'Good',
        processor: 'i5',
        ram: '8',
        serialNumber: '1234567',
    }

    beforeEach(() => {
        mockIonicReact();
        useLocationMock = jest.spyOn(require('react-router'), 'useLocation');
        useLocationMock.mockReturnValue({state: {computer: newComputerInfoMock, comeFrom: '/scan'}});
        jest.spyOn(require('commons/hooks/computers/useComputers'), 'default').mockReturnValue({
            addComputer: jest.fn((newComputer: NewComputer) => Promise.resolve(newComputer)),
            computers: [newComputerInfoMock] as Computer[],
            error: undefined,
            loading: false,
        });
        jest.spyOn(require('react'), 'useState').mockReturnValue([newComputerInfoMock, jest.fn()]);

    });

    afterEach(() => {
        useLocationMock.mockRestore();
    });

    it('should render', async () => {
        const {container} = await render(<EditComputerPage/>);
        await waitForIonicReact()
        await act(async () => {
            expect(container).toBeDefined();
        });
    });

});
