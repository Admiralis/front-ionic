import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {ionFireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';

import {Computer, Course} from "../../../commons/models";
import {ComputerService} from "../../../commons/services/computer";
import AddCoursePage from "./AddCourse.page";
import CourseService from "../../../commons/services/course/Course.service";

describe('AddComputerPage', () => {

    let useLocation: jest.SpyInstance;
    let useState: jest.SpyInstance;
    let useHistory: jest.SpyInstance;
    let saveCourse: jest.SpyInstance;
    let findComputerBySerial: jest.SpyInstance;

    beforeEach(() => {
        mockIonicReact();
        useLocation = jest.spyOn(require('react-router'), 'useLocation');
        useLocation.mockReturnValue({
            pathname: '/courses/new',
            state: {comeFrom: '/courses/new', serialNumber: 'TESTEST'}
        });

        useState = jest.spyOn(require('react'), 'useState');
        useState
            .mockReturnValue([{
                id: 1,
                label: 'TEST',
                startDate: new Date(),
                endDate: null
            }, jest.fn((newState: Computer) => {
                return newState
            })])
            .mockReturnValueOnce(['TESTEST', jest.fn((newState: string) => {
                return newState
            })])
            .mockReturnValueOnce([false, jest.fn((newState: boolean) => {
                return newState
            })])
            .mockReturnValueOnce([false, jest.fn((newState: boolean) => {
                return newState
            })])
            .mockReturnValueOnce([false, jest.fn((newState: boolean) => {
                return newState
            })])

        useHistory = jest.spyOn(require('react-router'), 'useHistory');
        useHistory.mockReturnValue({push: jest.fn()});

        saveCourse = jest.spyOn(CourseService, 'saveCourse')
            .mockImplementation((newCourse: Course) => {
                return Promise.resolve(newCourse)
            });

        findComputerBySerial = jest.spyOn(ComputerService, 'findComputerBySerial')
            .mockImplementation((serialNumber) => {
                return Promise.resolve({serialNumber: serialNumber} as Computer)
            })
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render', async () => {
        const {container} = await render(<AddCoursePage/>);
        await waitForIonicReact()
        expect(container).toBeDefined();
    });


    it('should should have submit button disabled if the course has no label and startdate', async () => {
        const {container} = await render(<AddCoursePage/>);
        await waitForIonicReact()
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form');
        const labelInput = screen.queryByTestId('input-label');
        const startDateInput = screen.queryByTestId('input-startDate');
        expect(form).toBeDefined();
        expect(labelInput).toBeDefined();
        expect(startDateInput).toBeDefined();
        expect(screen.queryByTestId('submit-button')).toBeDisabled();
    });

    it('should submit form if the course has a label and startdate', async () => {
        const {container} = await render(<AddCoursePage/>);
        await waitForIonicReact()
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form');
        const labelInput = screen.getByTestId('input-Intitulé');
        const startDateInput = screen.getByTestId('input-Début');
        fireEvent.change(labelInput as HTMLElement, {target: {value: 'TEST'}});
        fireEvent.change(startDateInput as HTMLElement, {target: {value: '07/05/2021'}});
        ionFireEvent.submit(form as HTMLElement);

        expect(saveCourse).toHaveBeenCalled();
        expect(findComputerBySerial).toHaveBeenCalled();
    });

    it('should open the modal if the computer does not exist', async () => {
        findComputerBySerial.mockImplementation(() => {
            return Promise.reject()
        })
        const {container} = await render(<AddCoursePage/>);
        await waitForIonicReact()
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form');
        const labelInput = screen.getByTestId('input-Intitulé');
        fireEvent.change(labelInput as HTMLElement, {target: {value: 'TEST'}});
        const startDateInput = screen.getByTestId('input-Début');
        fireEvent.change(startDateInput as HTMLElement, {target: {value: '07/05/2021'}});
        ionFireEvent.submit(form as HTMLElement);

        expect(saveCourse).toHaveBeenCalled();
        expect(findComputerBySerial).toHaveBeenCalled();

        // eslint-disable-next-line testing-library/prefer-presence-queries
        expect(screen.queryByText('Ce PC n\'existe pas !')).toBeDefined();
    });


});