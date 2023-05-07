import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';

import {SearchCourse} from "./SearchCourse";
import CourseService from "../../../../../services/course/Course.service";
import {Course} from "../../../../../models";

describe('SearchCourse', () => {

    let query: string = ''
    let setCourse: jest.Mock = jest.fn();
    const props = {
        setCourse: setCourse
    }
    let CourseServiceSpy: jest.SpyInstance;
    const courses: Course[] = [{
        id: '1',
        label: 'testLabel',
        startDate: new Date(),
        endDate: null,
        place: null
    }];

    beforeEach(async () => {
        await mockIonicReact();

        jest.spyOn(require('react'), 'useState')
            .mockImplementation(init => [init, jest.fn()])

        CourseServiceSpy = jest.spyOn(CourseService, 'findInProgressCoursesByLabel')
            .mockImplementation(() => {
                return Promise.resolve(courses);
            });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render', async () => {
        const {container} = render(<SearchCourse {...props} />);
        await act(async () => {
            await waitForIonicReact();
            expect(container).toBeDefined();
        });
    });

    it('should call CourseService.findInProgressCoursesByLabel when query change', async () => {
        render(<SearchCourse {...props} />);
        await act(async () => {
            await waitForIonicReact();
            expect(CourseServiceSpy).toHaveBeenCalledTimes(1);
            expect(CourseServiceSpy).toHaveBeenCalledWith(query);
        });
    });

    it('should console error when CourseService.findInProgressCoursesByLabel throw error', async () => {
        CourseServiceSpy.mockImplementation(() => {
            return Promise.reject('error');
        });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
        render(<SearchCourse {...props} />);
        await act(async () => {
            await waitForIonicReact();
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        });
    });

    it('should display the list of courses', async () => {
        render(<SearchCourse {...props} />);
            const list = screen.getByTestId('course-list');
            await waitForIonicReact();
            expect(list).toBeDefined();
        // eslint-disable-next-line testing-library/no-node-access
            expect(list.children.length).toBe(1);
            expect(screen.getByTestId('course-button-' + courses[0].id)).toBeDefined();
    });
});