import React from 'react';
import {act, render, renderHook, screen} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {useLocation} from "react-router";
import {Computer, NewComputer} from "../../../commons/models";
import EditComputerPage from "./EditComputer.page";

describe('EditComputerPage', () => {
    let useLocationMock: jest.SpyInstance;
    let useComputersMock: jest.SpyInstance;
    let useComputersSpy: jest.SpyInstance;
    let useStateMock: jest.SpyInstance;

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
        useComputersSpy = jest.spyOn(require('commons/hooks/computers/useComputers'), 'default').mockReturnValue({
            addComputer: jest.fn((newComputer: NewComputer) => Promise.resolve(newComputer)),
            computers: [newComputerInfoMock] as Computer[],
            error: undefined,
            loading: false,
        });
        useStateMock = jest.spyOn(require('react'), 'useState').mockReturnValue([newComputerInfoMock, jest.fn()]);

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
