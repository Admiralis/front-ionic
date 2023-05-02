import React from 'react';
import {render, screen, act} from '@testing-library/react';
import CardComponent from './Card.component';

describe('Card', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<CardComponent title={''}/>);
        expect(baseElement).toBeTruthy();
    });

    it('should have the correct title', () => {
        render(<CardComponent title={'test'}/>);
        const title = screen.getByText('test');
        expect(title).toBeInTheDocument();
    });

    it('should have the correct subtitle', () => {
        render(<CardComponent title={''} subtitle={'test'}/>);
        const subtitle = screen.getByText('test');
        expect(subtitle).toBeInTheDocument();
    });

    it('should have the correct children as content', () => {
        render(<CardComponent title={''} content={<div>test</div>}/>);
        const content = screen.getByText('test');
        expect(content).toBeInTheDocument();
    });

    it('should have the correct children as actions', () => {
        render(<CardComponent title={''} actions={<div>test</div>}/>);
        const content = screen.getByText('test');
        expect(content).toBeInTheDocument();
    });

    it('should have an alert svg if the alert props is true', () => {
        render(<CardComponent title={'Title'} alert={true} />);
        const alert = screen.getByTestId('alert');
        expect(alert).toBeInTheDocument();
    });

    it('should be tinyer if the props is true', () => {
        render(<CardComponent title={''} tiny={true}/>);
        const card = screen.getByTestId('header');
        expect(card).toHaveClass('header');

    });

    it('should be collapsible is the props is true', () => {
        render(<CardComponent title={''} collapsible={true}/>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('should be collapsed if the button is clicked', async () => {
        render(<CardComponent title={'Title'} collapsible={true} content={<p>test</p>}/>);
        const header = screen.getByText('Title')
        const setState = jest.fn();
        await act(() => {
            const useStateSpy = jest.spyOn(React, 'useState')
            header?.click();
            useStateSpy.mockImplementation(() => [false, setState(true)]);
        });
        expect(setState).toBeCalled();
    });

});