import React from 'react';
import {render, screen} from '@testing-library/react';
import CardComponent from './Card.component';

describe('Card', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<CardComponent title={''} />);
        expect(baseElement).toBeTruthy();
    });
});