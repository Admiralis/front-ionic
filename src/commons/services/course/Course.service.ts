import CourseRepository from "./Course.repository";
import {Course} from "../../models";

class CourseService {

    async findCourses(): Promise<Course[]> {
        return await CourseRepository.findAll();
    }

    async findCourseById(id: string): Promise<Course> {
        const course = CourseRepository.findById(id);
        if (course) {
            return course;
        }
        throw new Error("Course not found");
    }

    async findCourseByLabel(label: string): Promise<Course[] | undefined> {
        const courses = CourseRepository.findByLabel(label);
        if (courses === undefined) {
            throw new Error("Aucun cours trouvé avec ce label");
        }
        return Promise.resolve(courses);
    }

    async saveCourse(course: Course): Promise<Course> {
        return await CourseRepository.save(course);
    }

    async replaceCourse(course: Course): Promise<Course> {
        return await CourseRepository.replace(course);
    }

    async findCourseByLabelAndStartDate(label: string, startDate: Date): Promise<Course> {
        const course = CourseRepository.findByLabelAndStartDate(label, startDate);
        if (course === undefined) {
            throw new Error("Ce cours n'existe pas");
        }
        return Promise.resolve(course);
    }

}

export default new CourseService();