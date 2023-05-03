import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {IonInput, setupIonicReact, useIonViewDidEnter} from '@ionic/react';

import {AsciiInputComponent} from "./AsciiInput.component";
import style from "./AsciiInput.module.css";
import userEvent from "@testing-library/user-event";

// export function AsciiInputComponent(props: AsciiInputComponentProps) {
//
//
//     // Hook de Ionic qui s'exécute à l'affichage du composant.
//     // Focus l'input si props.autoFocus est passé
//     useIonViewDidEnter(() => {
//         if (props.autoFocus) {
//             const input: HTMLIonInputElement | null = document.querySelector(` #${props.label}`)
//             if (input?.id === props.label ) input?.setFocus()
//         }
//     }, [])
//
//     return (
//         <div className={style.asciiItem} data-testid='asciiInputComponent'>
//             <span className={props.smallText ? style.asciiSmallLabel : style.asciiLabel}>
//                 <span>&#62;</span>{props.label}{props.disabled ? <span className={props.smallText? style.littlePrompt : style.prompt }>$ </span> : <span className={props.smallText? style.littlePrompt : style.prompt }>_{props.required && <span>*</span>}</span>}</span>
//             <IonInput
//                 id={props.label}
//                 value={props.value}
//                 placeholder={props.placeholder}
//                 onIonChange={props.onIonChange}
//                 className={props.smallText ? style.asciiSmallInput : style.asciiInput}
//                 disabled={props.onIonChange === undefined}
//                 onBlur={props.onBlur}
//                 data-testid={'input-' + props.label}
//             />
//         </div>
//     );
// }

describe('AsciiInput', () => {
    let props: any;
    const onIonChangeMock = jest.fn();
    const onBlurMock = jest.fn();

    beforeEach(() => {
        setupIonicReact();
        mockIonicReact();
        props = {
            label: 'label',
            value: 'value',
            onIonChange: onIonChangeMock,
            onBlur: onBlurMock,
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

    it('should display the value', () => {
        render(<AsciiInputComponent {...props} />);
        const input = screen.queryByTestId('input-' + props.label);
        expect(input).toHaveValue(props.value);
    });

    it('should have a placeholder if the placeholder props is defined', () => {
        render(<AsciiInputComponent {...props} placeholder={'placeholder'}/>);
        const input = screen.queryByTestId('input-' + props.label);
        expect(input).toHaveAttribute('placeholder', 'placeholder');
    });

    it('should have a smaller font if the smallText props is true', () => {
        render(<AsciiInputComponent {...props} smallText={true}/>);
        const input = screen.queryByTestId('input-' + props.label);
        expect(input).toHaveClass('asciiSmallInput');
    });

    it('should be disabled if the disabled props is true', () => {
        render(<AsciiInputComponent {...props} disabled={true}/>);
        const input = screen.queryByTestId('input-' + props.label);
        expect(input).toBeDisabled();
    });

    it('should be disabled if onIonChange prop is not set', () => {
        render(<AsciiInputComponent {...props} onIonChange={undefined}/>);
        const input = screen.queryByTestId('input-' + props.label);
        expect(input).toBeDisabled();
    });

    it('should have a $ prompt if the disabled props is true', () => {
        render(<AsciiInputComponent {...props} disabled={true}/>);
        const prompt = screen.queryByText('$');
        expect(prompt).toBeInTheDocument();
    });

    it('should have a * prompt if the required props is true', () => {
        render(<AsciiInputComponent {...props} required={true}/>);
        const prompt = screen.queryByText('*');
        expect(prompt).toBeInTheDocument();
    });

    it('should have a smaller prompt if the smallText props is true', () => {
        render(<AsciiInputComponent {...props} smallText/>);
        const prompt = screen.getByText('_');
        expect(prompt).toHaveClass('littlePrompt');
    });

    it('should have a smaller label if the smallText props is true', () => {
        render(<AsciiInputComponent {...props} smallText/>);
        const label = screen.getByText(props.label);
        expect(label).toHaveClass('asciiSmallLabel');
    });

    it('should have a smaller disabled prompt if the smallText props is true', () => {
        render(<AsciiInputComponent {...props} smallText disabled/>);
        const prompt = screen.getByText('$');
        expect(prompt).toHaveClass('littlePrompt');
    });

    it('should have an id equals to the label', () => {
        render(<AsciiInputComponent {...props} />);
        const input = screen.queryByTestId('input-' + props.label);
        expect(input).toHaveAttribute('id', props.label);
    });

    it('should loose focus if the input is blurred', async () => {
        render(<AsciiInputComponent {...props} autoFocus/>);
        await waitForIonicReact();
        const input = screen.queryByTestId('input-' + props.label) as Element
        userEvent.click(input);
        await act(async () => {
            expect(input).not.toHaveFocus();
        });
    });

});

