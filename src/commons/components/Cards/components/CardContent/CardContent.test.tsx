import React from 'react';
import {render, screen} from '@testing-library/react';
import {CardContentComponent} from "./CardContent.component";

describe('CardContent', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<CardContentComponent/>);
        expect(baseElement).toBeTruthy();
    });

    it('should va no content if the content is collapsed', () => {
        render(<CardContentComponent collapsible collapsed/>);
        const div = screen.getByTestId('collapsed');
        expect(div).toBeInTheDocument();
    });

    it('should have a content if the content is not collapsed', () => {
        render(<CardContentComponent collapsible/>);
        const div = screen.getByTestId('extended');
        expect(div).toBeInTheDocument();
    });

    it('should have a content if content is passend', () => {
        render(<CardContentComponent content={<div>test</div>}/>);
        const div = screen.getByText('test');
        expect(div).toBeInTheDocument();
    });

    it('should have action if actions is passed', () => {
        render(<CardContentComponent actions={<div>test</div>}/>);
        const div = screen.getByText('test');
        expect(div).toBeInTheDocument();
    });

});