import React from 'react';
import {render} from '@testing-library/react';
import {CommentsComponent} from "./Comments.component";

describe('Comments', () => {
   it('should render successfully', () => {
         const {baseElement} = render(<CommentsComponent/>);
         expect(baseElement).toBeTruthy();
   });
});