import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {setupIonicReact} from '@ionic/react';

import {ComputerFormComponent} from "./ComputerForm.component";
import {Computer} from "../../../models";

describe('ComputerForm', () => {

    let props: any;

    beforeEach(() => {
        setupIonicReact();
        mockIonicReact();
        const setComputerSerialMock = jest.fn();
        props = {
            newComputerInfo: {
                serialNumber: 'AAAAAAA',
                category: 'categoryInput',
                ram: 'ramInput',
                processor: 'processorInput',
                condition: 'conditionInput',
            } as Computer,
            setNewComputerInfo: setComputerSerialMock
        }
    })

    it('should render successfully', () => {
        const {baseElement} = render(<ComputerFormComponent {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should change the computer ram if the input is changed', async () => {
        render(<ComputerFormComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-RAM'), 'BBBBBBB');
        await act(async () => {
            expect(props.setNewComputerInfo).toHaveBeenCalledWith({
                ...props.newComputerInfo,
                ram: 'BBBBBBB'
            });
        });
    });

    it('should change the computer processor if the input is changed', async () => {
        render(<ComputerFormComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-Processeur'), 'BBBBBBB');
        await act(async () => {
            expect(props.setNewComputerInfo).toHaveBeenCalledWith({
                ...props.newComputerInfo,
                processor: 'BBBBBBB'
            });
        });
    });

    it('should change the computer condition if the input is changed', async () => {
        render(<ComputerFormComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-Etat'), 'BBBBBBB');
        await act(async () => {
            expect(props.setNewComputerInfo).toHaveBeenCalledWith({
                ...props.newComputerInfo,
                condition: 'BBBBBBB'
            });
        });
    });

    it('should have empty inputs if the computer is undefined', async () => {
        props.newComputerInfo = undefined;
        render(<ComputerFormComponent {...props} newComputerInfo={ {} as Computer} />);
        await waitForIonicReact();
        // expect(screen.getByTestId('input-Catégorie')).toHaveValue('');
        expect(screen.getByTestId('input-RAM')).toHaveValue('');
        expect(screen.getByTestId('input-Processeur')).toHaveValue('');
        expect(screen.getByTestId('input-Etat')).toHaveValue('');
    });

});