import React from 'react';
import {render, screen} from '@testing-library/react';

import {CardButtonsComponent} from "./CardButtons.component";

describe('CardButtons', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<CardButtonsComponent/>);
        expect(baseElement).toBeTruthy();
    });

    it('should display an empty div if the collapsible props is false', () => {
        render(<CardButtonsComponent collapsible={false}/>);
        const div = screen.getByTestId('no-collapsible');
        expect(div).toBeInTheDocument();
    });

    it('should display an button if the collapsible props is true', () => {
        render(<CardButtonsComponent collapsible/>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('should have a yellow button if collapsible props is true', () => {
        render(<CardButtonsComponent collapsible/>);
        const button = screen.getByRole('button');
        // eslint-disable-next-line testing-library/no-node-access
        const circle = button.querySelector('circle');
        expect(circle).toHaveAttribute('fill', '#FFBD4C')

    });

    it('should have a green button if collapsed', () => {
        render(<CardButtonsComponent collapsible collapsed/>);
        const button = screen.getByRole('button');
        // eslint-disable-next-line testing-library/no-node-access
        const circle = button.querySelector('circle');
        expect(circle).toHaveAttribute('fill', '#00CA56');
    });

});