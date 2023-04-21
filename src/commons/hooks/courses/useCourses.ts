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
     * @param newCourse
     */
    const addCourse = (newCourse: Course) => {
        setIsLoading(true);
        CourseService.saveCourse(newCourse).then(course => {
            setError(null);
            const newCourses =  courses.filter(c => c.id !== course.id);
            newCourses.push(course);
            setCourses(newCourses);
            return course;
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return {courses, isLoading, error, addCourse}
};

export default UseCourses;