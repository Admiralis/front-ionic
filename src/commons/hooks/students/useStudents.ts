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
        (async () => {
            await getStudents();
        })()
    }, [])

    const getStudents = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const students = await StudentService.findStudents();
            setStudents(students);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    const addStudent = async (student: Student) => {
        try {
            setIsLoading(true);
            setError(null);
            const savedStudent: Student = await StudentService.saveStudent(student);
            setStudents([...students, savedStudent]);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }

    }

    return {students, isLoading, error, addStudent}

};


export default UseStudents;