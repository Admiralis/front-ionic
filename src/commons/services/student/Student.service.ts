import Student from "../../models/student/Student.model";
import StudentRepository from "./Student.repository";

class StudentService {
    async findStudents(): Promise<Student[]> {
        return await StudentRepository.findAll();
    }

    async findStudentById(id: string): Promise<Student> {
        const student = StudentRepository.findById(id);
        if (student) {
            return student;
        }
        throw new Error("Student not found");
    }

    async findStudentByCourseId(courseId: string): Promise<Student[] | undefined> {
        const students = StudentRepository.findByCourseId(courseId);
        if (students === undefined) {
            throw new Error("Aucun étudiant trouvé avec ce cours");
        }
        return Promise.resolve(students);
    }

    async saveStudent(student: Student): Promise<Student> {
        return await StudentRepository.save(student);
    }

    async replaceStudent(student: Student): Promise<Student> {
        return await StudentRepository.replace(student);
    }

}

export default new StudentService();