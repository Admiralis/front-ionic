import {act, renderHook} from '@testing-library/react'

import useCourses from "./useCourses";
import {Course} from "../../models";

jest.mock('../../services/course/Course.service', () => ({
    findCourses: jest.fn(async () => {
            return [] as Course[];
        }
    ),
    saveCourse: jest.fn(
        (newCourse: Course) => new Promise((resolve) => resolve(newCourse))
    )
}));

describe('useCourses', () => {

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return courses, isLoading and error', async () => {
            const {result} = renderHook(() => useCourses());

            await act(async () => {
                await expect(result.current).toEqual({courses: [], isLoading: true, error: null, addCourse: expect.any(Function)});
            });
        });

        it('should call addCourse', async () => {
            const {result} = renderHook(() => useCourses());

            await act(async () => {
                await result.current.addCourse({} as Course);
            });

            expect(result.current.courses.length).toEqual(1);
        });
});