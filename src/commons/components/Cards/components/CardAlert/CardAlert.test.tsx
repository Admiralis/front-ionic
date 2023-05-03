import React from 'react';
import {render, screen} from '@testing-library/react';
import {CardAlertComponent} from "./CardAlert.component";

describe('CardAlert', () => {

    it('should render successfully', () => {
        const {baseElement} = render(<CardAlertComponent/>);
        expect(baseElement).toBeTruthy();
    });

    it('should display an empty div if the alert props is false', () => {
        render(<CardAlertComponent alert={false}/>);
        const div = screen.getByTestId('no-alert');
        expect(div).toBeInTheDocument();
    });

    it('should display an alert svg if the alert props is true', () => {
        render(<CardAlertComponent alert />);
        const alert = screen.getByTestId('alert-icon-component');
        expect(alert).toBeInTheDocument();
    });

});

