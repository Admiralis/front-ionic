import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent} from '@ionic/react-test-utils';
import {mockIonicReact} from '@ionic/react-test-utils';
import {setupIonicReact} from '@ionic/react';
import {ComputerAddFormComponent} from "./ComputerAddFormComponent";
import {Computer} from "../../../models";

describe('ComputerAddForm', () => {

    let props: any;

    beforeEach(() => {
        setupIonicReact();
        mockIonicReact();
        const setComputerSerialMock = jest.fn();
        const setNewComputerInfoMock = jest.fn();
        props = {
            computerSerial: 'AAAAAAA',
            setComputerSerial: setComputerSerialMock,
            newComputerInfo: {
                serialNumber: 'AAAAAAA'
            } as Computer,
            setNewComputerInfo: setNewComputerInfoMock

        }
    })

    it('should render successfully', () => {
        const {baseElement} = render(<ComputerAddFormComponent {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should change the computer serial if the input is changed', async () => {
        render(<ComputerAddFormComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-SerialNumber'), 'BBBBBBB');
        await act(async () => {
            expect(props.setComputerSerial).toHaveBeenCalledWith('BBBBBBB');
        });
    });

});