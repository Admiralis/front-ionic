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
        CourseService.findCourses().then(courses => {
            setError(null);
            setCourses(courses);
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [])

    /**
     * Ajoute un cours à la liste
     * @param course
     */
    const addCourse = (course: Course) => {
        setIsLoading(true);
        CourseService.saveCourse(course).then(course => {
            setError(null);
            setCourses([...courses, course]);
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return {courses, isLoading, error, addCourse}
};

export default UseCourses;