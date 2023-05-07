import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {setupIonicReact} from '@ionic/react';

import CourseFormComponent from "./CourseForm.component";
import {Course} from "../../../models";

describe('CourseFormComponent', () => {
    let props: any;
    beforeEach(() => {
        setupIonicReact();
        mockIonicReact();
        const setNewCourseInfo = jest.fn();
        props = {
            newCourseInfo: {},
            setNewCourseInfo: setNewCourseInfo
        };
    });

    it('should render successfully', async () => {
        const {baseElement} = render(<CourseFormComponent {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should have all fields', async () => {
        render(<CourseFormComponent {...props} />);
        await act(async () => {
            await waitForIonicReact();
        });
        expect(screen.getByText('Intitulé')).toBeTruthy();
        expect(screen.getByText('Début')).toBeTruthy();
        expect(screen.getByText('Fin')).toBeTruthy();
        expect(screen.getByText('Lieu')).toBeTruthy();
    });

    it('should have all fields with correct values', async () => {
        props.newCourseInfo = {
            label: 'label',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2021-01-02'),
            place: 'place'
        } as Course;
        render(<CourseFormComponent {...props} />);
        await waitForIonicReact();
        expect(screen.getByTestId('input-Intitulé')).toBeTruthy();
        expect(screen.getByTestId('input-Intitulé').getAttribute('value')).toEqual('label');
        expect(screen.getByTestId('input-Début')).toBeTruthy();
        // expect(screen.getByTestId('input-Début').getAttribute('value')).toEqual('01/01/2021');
        expect(screen.getByTestId('input-Fin')).toBeTruthy();
        // expect(screen.getByTestId('input-Fin').getAttribute('value')).toEqual('02/01/2021');
        expect(screen.getByTestId('input-Lieu')).toBeTruthy();
    });

    it('should change the course label if the input is changed', async () => {
        render(<CourseFormComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-Intitulé'), 'BBBBBBB');
        await act(async () => {
            expect(props.setNewCourseInfo).toHaveBeenCalledWith({label: 'BBBBBBB'});
        });
    });

    it('should change the place if the input is changed', async () => {
        render(<CourseFormComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-Lieu'), 'BBBBBBB');
        await act(async () => {
            expect(props.setNewCourseInfo).toHaveBeenCalledWith({place: 'BBBBBBB'});
        });
    });

});
