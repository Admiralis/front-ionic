import Student from "../../models/student/Student.model";
import StudentRepository from "./Student.repository";

/**
 * Service permettant de gérer les étudiants
 */
class StudentService {

    /**
     * Récupère la liste des étudiants
     */
    async findStudents(): Promise<Student[]> {
        return await StudentRepository.findAll();
    }

    /**
     * Récupère un étudiant par son id
     * @param id
     */
    async findStudentById(id: string): Promise<Student> {
        const student = StudentRepository.findById(id);
        if (student) {
            return student;
        }
        throw new Error("Student not found");
    }

    /**
     * Retourne les étudiants d'un cours spécifique
     * @param courseId
     */
    async findStudentByCourseId(courseId: string): Promise<Student[] | undefined> {
        const students = StudentRepository.findByCourseId(courseId);
        if (students === undefined) {
            throw new Error("Aucun étudiant trouvé avec ce cours");
        }
        return Promise.resolve(students);
    }

    /**
     * Créé un étudiant ou le met à jour s'il existe déjà
     * @param student
     */
    async saveStudent(student: Student): Promise<Student> {
        return await StudentRepository.save(student);
    }

    /**
     * Ecrase l'étudiant avec les nouvelles informations
     * @param student
     */
    async replaceStudent(student: Student): Promise<Student> {
        return await StudentRepository.replace(student);
    }

}

export default new StudentService();