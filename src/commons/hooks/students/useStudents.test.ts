import {act, renderHook} from '@testing-library/react'
import useStudents from "./useStudents";
import Student from "../../models/student/Student.model";

jest.mock('../../services/student/Student.service', () => ({
    findStudents: jest.fn(async () => {
        return [] as Student[];
    }),
    saveStudent: jest.fn(
        (newStudent: Student) => new Promise((resolve) => resolve(newStudent))
    )
}));

describe('useStudents', () => {

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return students, isLoading and error, addStudent', async () => {
            const {result} = renderHook(() => useStudents());

            await act(async () => {
                await expect(result.current).toEqual({
                    students: [],
                    isLoading: true,
                    error: null,
                    addStudent: expect.any(Function)
                });
            });
        });

        it('should call addStudent', async () => {
            const {result} = renderHook(() => useStudents());

            await act(async () => {
                await result.current.addStudent({} as Student);
            });

            expect(result.current.students.length).toEqual(1);
        });
});