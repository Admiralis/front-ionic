import { Course } from 'commons/models';
import React, {useEffect} from 'react';
import CourseService from "../../services/course/Course.service";

/**
 * Hook permettant de récupérer la liste des cours et d'en ajouter
 */
const UseCourses = () => {

    const [courses, setCourses] = React.useState<Course[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        (async () => {
            await getCourses();
        })()
    }, [])

    const getCourses = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const courses = await CourseService.findCourses();
            setCourses(courses);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Ajoute un cours à la liste
     * @param newCourse
     */
    const addCourse = async (newCourse: Course) => {
            try {
                setIsLoading(true);
                setError(null);
                const savedCourse: Course = await CourseService.saveCourse(newCourse);
                setCourses([...courses, savedCourse]);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
    }

    return {courses, isLoading, error, addCourse}
};

export default UseCourses;