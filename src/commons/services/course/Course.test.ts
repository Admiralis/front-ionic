import {mockIonicReact} from '@ionic/react-test-utils'

import CourseService from "./Course.service";
import CourseRepository from "./Course.repository";
import {Course} from "../../models";

// class CourseService {
//
//     /**
//      * Récupère la liste des cours
//      */
//     async findCourses(): Promise<Course[]> {
//         return await CourseRepository.findAll();
//     }
//
//     /**
//      * Récupère un cours par son id
//      * @param id
//      */
//     async findCourseById(id: string): Promise<Course> {
//         const course = CourseRepository.findById(id);
//         if (course) {
//             return course;
//         }
//         throw new Error("Course not found");
//     }
//
//     /**
//      * Créé un cours ou le met à jour s'il existe déjà
//      * @param course
//      */
//     async saveCourse(course: Course): Promise<Course> {
//         return await CourseRepository.save(course);
//     }
//
//     /**
//      * Permet de rechercher un cours en fonction de son label et de sa date de début
//      * @param label : le label du cours
//      * @param startDate : la date de début du cours
//      * @param startDate
//      */
//     async findCourseByLabelAndStartDate(label: string, startDate: Date): Promise<Course> {
//         const course: Promise<Course> = CourseRepository.findByLabelAndStartDate(label, startDate);
//         if (course === undefined) {
//             throw new Error("Ce cours n'existe pas");
//         }
//         return Promise.resolve(course);
//     }
//
//     async findInProgressCoursesByLabel(label: string): Promise<Course[]> {
//         const courses = CourseRepository.findInProgressByLabel(label);
//         if (courses === undefined) {
//             return Promise.resolve([]);
//         }
//         return Promise.resolve(courses);
//     }
//
// }

describe('CourseService', () => {

    const mockCourse: Course = {
        label: 'test',
        startDate: new Date(),
        id: '1',
        endDate: new Date(),
        place: 'test'
    }

    const findAllMock = jest.fn(() => Promise.resolve([]));
    const findByIdMock = jest.fn(() => Promise.resolve(mockCourse));
    const saveMock = jest.fn(() => Promise.resolve(mockCourse));
    const findByLabelAndStartDateMock = jest.fn(() => Promise.resolve(mockCourse));
    const findInProgressByLabelMock = jest.fn(() => Promise.resolve([]));

    jest.doMock('./Course.repository', async () => {
        return {
            findAll: await findAllMock(),
            findById: await findByIdMock(),
            save: await saveMock(),
            findByLabelAndStartDate: await findByLabelAndStartDateMock(),
            findInProgressByLabel: await findInProgressByLabelMock()
        }
    });

    beforeEach(() => {
        mockIonicReact();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call findAll', async () => {
        const findCoursesSpy = jest.spyOn(CourseRepository, 'findAll').mockImplementationOnce(() => Promise.resolve([]));
        await CourseService.findCourses();
        expect(findCoursesSpy).toHaveBeenCalled();
    });

    it('should call findById', async () => {
        const findCourseByIdSpy = jest.spyOn(CourseRepository, 'findById').mockResolvedValueOnce(mockCourse);
        await CourseService.findCourseById('1');
        expect(findCourseByIdSpy).toHaveBeenCalled();
    });

    it('should call save', async () => {
        const saveCourseSpy = jest.spyOn(CourseRepository, 'save').mockImplementationOnce(
            () => Promise.resolve(mockCourse)
        )
        await CourseService.saveCourse(mockCourse);
        expect(saveCourseSpy).toHaveBeenCalled();
    });

    it('should call findByLabelAndStartDate', async () => {
        const findByLabelAndStartDateSpy = jest.spyOn(CourseRepository, 'findByLabelAndStartDate').mockImplementationOnce(() => Promise.resolve(mockCourse));

        await CourseService.findCourseByLabelAndStartDate('test', new Date());
        expect(findByLabelAndStartDateSpy).toHaveBeenCalled();
    });

    it('should call findInProgressByLabel', async () => {
        const findInProgressByLabelSpy = jest.spyOn(CourseRepository, 'findInProgressByLabel').mockImplementationOnce(() => Promise.resolve([]));

        await CourseService.findInProgressCoursesByLabel('test');
        expect(findInProgressByLabelSpy).toHaveBeenCalled();
    });

    it('should throw an error if course not found', async () => {
        const findCourseByIdSpy = jest.spyOn(CourseRepository, 'findById').mockResolvedValueOnce(Promise.reject(new Error("Course not found")));
        await expect(CourseService.findCourseById('2')).rejects.toThrowError("Course not found");
        expect(findCourseByIdSpy).toHaveBeenCalled();
    });

    it('should throw an error if the course is not found by label and start date', async () => {
        const findByLabelAndStartDateSpy = jest.spyOn(CourseRepository, 'findByLabelAndStartDate').mockResolvedValueOnce(Promise.reject(new Error("Ce cours n'existe pas")));
        await expect(CourseService.findCourseByLabelAndStartDate('test', new Date())).rejects.toThrowError("Ce cours n'existe pas");
        expect(findByLabelAndStartDateSpy).toHaveBeenCalled();
    });

    it('should return an empty array if no course found', async () => {
        const findInProgressByLabelSpy = jest.spyOn(CourseRepository, 'findInProgressByLabel').mockResolvedValueOnce(Promise.resolve([]));
        await expect(CourseService.findInProgressCoursesByLabel('test')).resolves.toEqual([]);
        expect(findInProgressByLabelSpy).toHaveBeenCalled();
    });

});