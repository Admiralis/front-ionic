import Course from "../course/Course.model";

interface Student {
    id?: string;
    firstName: string;
    lastName: string;
    course: Course;
}

export default Student;