// import CourseRepository from "./Course.repository.mock";
import {Course} from "../../models";
import CourseRepository from "./Course.repository";

/**
 * Service permettant de gérer les cours
 */
class CourseService {

    /**
     * Récupère la liste des cours
     */
    async findCourses(): Promise<Course[]> {
        return await CourseRepository.findAll();
    }

    /**
     * Récupère un cours par son id
     * @param id
     */
    async findCourseById(id: string): Promise<Course> {
        const course = CourseRepository.findById(id);
        if (course !== undefined) {
            return course;
        }
        throw new Error("Course not found");
    }

    // /**
    //  * Récupère tous les cours ayant le label demandé
    //  * @param label
    //  */
    // async findCourseByLabel(label: string): Promise<Course[] | undefined> {
    //     const courses = CourseRepository.findByLabel(label);
    //     if (courses === undefined) {
    //         throw new Error("Aucun cours trouvé avec ce label");
    //     }
    //     return Promise.resolve(courses);
    // }

    /**
     * Créé un cours ou le met à jour s'il existe déjà
     * @param course
     */
    async saveCourse(course: Course): Promise<Course> {
        return await CourseRepository.save(course);
    }

    // /**
    //  * Ecrase le cours avec les nouvelles informations
    //  * @param course
    //  */
    // async replaceCourse(course: Course): Promise<Course> {
    //     return await CourseRepository.replace(course);
    // }

    /**
     * Permet de rechercher un cours en fonction de son label et de sa date de début
     * @param label : le label du cours
     * @param startDate : la date de début du cours
     * @param startDate
     */
    async findCourseByLabelAndStartDate(label: string, startDate: Date): Promise<Course> {
        const course: Promise<Course> = CourseRepository.findByLabelAndStartDate(label, startDate);
        if (course === undefined) {
            throw new Error("Ce cours n'existe pas");
        }
        return Promise.resolve(course);
    }

    async findInProgressCoursesByLabel(label: string): Promise<Course[]> {
        const courses = CourseRepository.findInProgressByLabel(label);
        if (courses === undefined) {
            return Promise.resolve([]);
        }
        return Promise.resolve(courses);
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CourseService();