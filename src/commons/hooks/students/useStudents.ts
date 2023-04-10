import React, {useEffect} from 'react';
import Student from "../../models/student/Student.model";
import StudentService from "../../services/student/Student.service";

/**
 * Hook permettant de récupérer la liste des étudiants et d'en ajouter
 * @constructor
 */
const UseStudents = () => {
    const [students, setStudents] = React.useState<Student[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        StudentService.findStudents().then(students => {
            setError(null);
            setStudents(students);
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [])

    const addStudent = (student: Student) => {
        setIsLoading(true);
        StudentService.saveStudent(student).then(student => {
            setError(null);
            setStudents([...students, student]);
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return {students, isLoading, error, addStudent}

};



export default UseStudents;