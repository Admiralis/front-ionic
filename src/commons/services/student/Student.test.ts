import {mockIonicReact} from '@ionic/react-test-utils'

import StudentService from "./Student.service";
import StudentRepository from "./Student.repository";
import {Student} from "../../models";

// class StudentService {
//
//     /**
//      * Récupère la liste des étudiants
//      */
//     async findStudents(): Promise<Student[]> {
//         return await StudentRepository.findAll();
//     }
//
//     /**
//      * Récupère un étudiant par son id
//      * @param id
//      */
//     async findStudentById(id: string): Promise<Student> {
//         const student = StudentRepository.findById(id);
//         if (student) {
//             return student;
//         }
//         throw new Error("Student not found");
//     }
//
//     /**
//      * Retourne les étudiants d'un cours spécifique
//      * @param courseId
//      */
//     async findStudentByCourseId(courseId: string): Promise<Student[] | undefined> {
//         const students = StudentRepository.findByCourseId(courseId);
//         if (students === undefined) {
//             throw new Error("Aucun étudiant trouvé avec ce cours");
//         }
//         return Promise.resolve(students);
//     }
//
//     /**
//      * Créé un étudiant ou le met à jour s'il existe déjà
//      * @param student
//      */
//     async saveStudent(student: Student): Promise<Student> {
//         return await StudentRepository.save(student);
//     }
//
//     /**
//      * Ecrase l'étudiant avec les nouvelles informations
//      * @param student
//      */
//     async replaceStudent(student: Student): Promise<Student> {
//         return await StudentRepository.replace(student);
//     }
//
// }

describe('StudentService', () => {

    const findStudentsMock = jest.spyOn(StudentRepository, 'findAll');
    const findStudentByIdMock = jest.spyOn(StudentRepository, 'findById');
    const findStudentByCourseIdMock = jest.spyOn(StudentRepository, 'findByCourseId');
    const saveStudentMock = jest.spyOn(StudentRepository, 'save');
    const replaceStudentMock = jest.spyOn(StudentRepository, 'replace');

    jest.doMock('./Student.repository', () => ({
        findAll: findStudentsMock,
        findById: findStudentByIdMock,
        findByCourseId: findStudentByCourseIdMock,
        save: saveStudentMock,
        replace: replaceStudentMock
    }));

    beforeEach(() => {
        mockIonicReact();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call findAll', async () => {
        const findStudentSpy = jest.spyOn(StudentRepository, 'findAll').mockResolvedValueOnce([])
        await StudentService.findStudents();
        expect(findStudentSpy).toHaveBeenCalled();
    });

    it('should call findById', async () => {
        const findStudentSpy = jest.spyOn(StudentRepository, 'findById').mockResolvedValueOnce({} as Student)
        await StudentService.findStudentById("1");
        expect(findStudentSpy).toHaveBeenCalled();
    });

    it('should call findByCourseId', async () => {
        const findStudentSpy = jest.spyOn(StudentRepository, 'findByCourseId').mockResolvedValueOnce([] as Student[])
        await StudentService.findStudentByCourseId("1");
        expect(findStudentSpy).toHaveBeenCalled();
    });

    it('should call save', async () => {
        const findStudentSpy = jest.spyOn(StudentRepository, 'save').mockResolvedValueOnce({} as Student)
        await StudentService.saveStudent({} as Student);
        expect(findStudentSpy).toHaveBeenCalled();
    });

    it('should call replace', async () => {
        const findStudentSpy = jest.spyOn(StudentRepository, 'replace').mockResolvedValueOnce({} as Student)
        await StudentService.replaceStudent({} as Student);
        expect(findStudentSpy).toHaveBeenCalled();
    });

})