import React from 'react';
import {act, render} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {NewComputer} from "../../../../commons/models";
import {EditComputerComponent} from "./EditComputer.component";

describe('EditComputerComponent', () => {

    const newComputerInfoMock: NewComputer = {
        category: 'Laptop',
        comments: [],
        condition: 'Good',
        processor: 'i5',
        ram: '8',
        serialNumber: '1234567',
    }

    const setNewComputerInfoMock = jest.fn((newComputerChange: NewComputer) => {
        return newComputerChange;
    });

    beforeEach(() => {
        mockIonicReact();
    });

    it('should render', async () => {
        const {container} = await render(<EditComputerComponent newComputerInfo={newComputerInfoMock} setNewComputerInfo={setNewComputerInfoMock}/>);
        await waitForIonicReact()
        await act(async () => {
            expect(container).toBeDefined();
        });
    });

});