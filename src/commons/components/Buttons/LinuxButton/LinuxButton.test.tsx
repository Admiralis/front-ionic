import React from 'react';
import { render, screen } from '@testing-library/react';
import LinuxButtonComponent from './LinuxButton.component';

describe('LinuxButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<LinuxButtonComponent />);
        expect(baseElement).toBeTruthy();
    });

    it('function called when the button is clicked', () => {
        const mockFunction = jest.fn();

        render(<LinuxButtonComponent onClick={mockFunction}/>);
        const button = screen.getByRole('button');
        button.click();
        expect(mockFunction).toHaveBeenCalled();
    });

    it ('the color should be green by default', () => {
        render(<LinuxButtonComponent />);
        const button = screen.getByRole('button');
        // eslint-disable-next-line testing-library/no-node-access
        const circle = button.querySelector('circle');
        expect(circle).toHaveAttribute('fill', '#00CA56')
    });

    it ('the color should be red when the color props is red', () => {
        render(<LinuxButtonComponent color={"red"}/>);
        const button = screen.getByRole('button');
        // eslint-disable-next-line testing-library/no-node-access
        const circle = button.querySelector('circle');
        expect(circle).toHaveAttribute('fill', '#EB4B4D')
    });

    it ('the color should be yellow when the color props is yellow', () => {
        render(<LinuxButtonComponent color={"yellow"}/>);
        const button = screen.getByRole('button');
        // eslint-disable-next-line testing-library/no-node-access
        const circle = button.querySelector('circle');
        expect(circle).toHaveAttribute('fill', '#FFBD4C')
    });

    it ('the size should be 20px by default', () => {
        render(<LinuxButtonComponent />);
        const button = screen.getByRole('button');
        // eslint-disable-next-line testing-library/no-node-access
        const svg = button.querySelector('svg');
        expect(svg).toHaveAttribute('width', '20')
        expect(svg).toHaveAttribute('height', '20')
    });

    it ('the size should be 15px when the small props is true', () => {
        render(<LinuxButtonComponent small={true}/>);
        const button = screen.getByRole('button');
        // eslint-disable-next-line testing-library/no-node-access
        const svg = button.querySelector('svg');
        expect(svg).toHaveAttribute('width', '15')
        expect(svg).toHaveAttribute('height', '15')
    });

    it('sould be hidden if the hidden props is true', () => {
        render(<LinuxButtonComponent hidden/>);
        expect(screen.queryByRole('button')).toBeNull();
    });

});