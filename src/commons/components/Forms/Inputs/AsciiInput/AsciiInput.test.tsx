import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent, mockIonicReact} from '@ionic/react-test-utils';
import {setupIonicReact} from '@ionic/react';

import {AsciiInputComponent} from "./AsciiInput.component";

describe('AsciiInput', () => {
    let props: any;

    beforeEach(() => {
        setupIonicReact();
        mockIonicReact();
        const onIonChangeMock = jest.fn();
        const onIonBlurMock = jest.fn();
        props = {
            label: 'label',
            value: 'value',
            onIonChange: onIonChangeMock,
            onIonBlur: onIonBlurMock,
        }
    });

    it('should render successfully', () => {
        const {baseElement} = render(<AsciiInputComponent {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should change the value if the input is changed', async () => {
        render(<AsciiInputComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-' + props.label), 'BBBBBBB');
        await act(async () => {
            expect(props.onIonChange).toHaveBeenCalled();
        });
    });

    it('should be focused if the autoFocus props is true', async () => {
        render(<AsciiInputComponent {...props} autoFocus={true}/>);

        const input = screen.getByTestId('asciiInputComponent');
        await act(async () => {
            // eslint-disable-next-line testing-library/no-node-access
            expect(input.parentElement?.parentElement).toHaveFocus();
        });

    });

    it('should not be focused if the autoFocus props is false', async () => {
        render(<AsciiInputComponent {...props} autoFocus={false}/>);
        const input = screen.getByTestId('asciiInputComponent');

        await act(async () => {
            // eslint-disable-next-line testing-library/no-node-access
            expect(input.parentElement).not.toHaveFocus();
        });
    });

    it('should display the label', () => {
        render(<AsciiInputComponent {...props} />);
        const label = screen.getByText(props.label);
        expect(label).toBeInTheDocument();
    });

});