import React from 'react';
import {render, screen} from '@testing-library/react';
import CommentsButtonsComponent from './CommentsButtons.component';

describe('CommentButtons', () => {
    it('should render successfully the add button', () => {
        const {baseElement} = render(<CommentsButtonsComponent action={"add"}/>);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully the green button', () => {
        const {baseElement} = render(<CommentsButtonsComponent action={"remove"}/>);
        expect(baseElement).toBeTruthy();
    });

    it('function called when the button add is clicked', () => {
        const mockFunction = jest.fn();

        render(<CommentsButtonsComponent action={"add"} onClick={mockFunction}/>);
        const button = screen.getByRole('button');
        button.click();
        expect(mockFunction).toHaveBeenCalled();
    });

    it('function called when the button remove is clicked', () => {
        const mockFunction = jest.fn();

        render(<CommentsButtonsComponent action={"remove"} onClick={mockFunction}/>);
        const button = screen.getByRole('button');
        button.click();
        expect(mockFunction).toHaveBeenCalled();
    });

});