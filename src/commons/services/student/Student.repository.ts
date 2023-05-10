import Student from "../../models/student/Student.model";

const students: Student[] = [
    {
        id: "1",
        firstName: "John",
        lastName: "Dev Java",
        course: {
            id: "1",
            label: "POE Java",
            startDate: new Date("2019-01-01"),
            endDate: new Date("2019-03-31"),
            place: "Salle 2"
        }
    },
    {
        id: "2",
        firstName: "Jane",
        lastName: "Admin",
        course: {
            id: "9",
            label: "POE Admin Linux",
            startDate: new Date("2021-01-01"),
            endDate: null,
            place: null
        }
    },
    {
        id: "3",
        firstName: "Jack",
        lastName: "Angular",
        course: {
            id: "5",
            label: "POE React",
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-06-30"),
            place: "Salle 3"
        }

    },
    {
        id: "4",
        firstName: "Jill",
        lastName: "Penguin",
        course: {
            id: "9",
            label: "POE Admin Linux",
            startDate: new Date("2021-01-01"),
            endDate: null,
            place: null
        }

    },
    {
        id: "5",
        firstName: "Jenny",
        lastName: "Doe",
    },
    {
        id: "6",
        firstName: "Jenny",
        lastName: "Doe",
    }
]

class StudentRepository {
    findAll(): Promise<Student[]> {
        return Promise.resolve(students);
    }

    findById(id: string): Promise<Student> {
        let student = students.find(student => student.id === id);
        if (student) {
            return Promise.resolve(student);
        }
        return Promise.reject("Student not found");
    }

    findByCourseId(courseId: string): Promise<Student[]> {
        let studentsByCourse = students.filter(student => student.course?.id === courseId);
        if (studentsByCourse) {
            return Promise.resolve(studentsByCourse);
        }
        return Promise.reject("Students not found");
    }

    save(student: Student): Promise<Student> {
        const index = students.findIndex(s => s.id === student.id);
        if (index !== -1) {
            students[index] = student;
            return Promise.resolve(student);
        } else {
            students.push(student);
        }
        return Promise.resolve(student);
    }

    replace(student: Student): Promise<Student> {
        const index = students.findIndex(s => s.id === student.id);
        if (index !== -1) {
            students[index] = student;
            return Promise.resolve(student);
        }
        return Promise.reject("Student not found");
    }

    delete(id: string): Promise<Student> {
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            return Promise.resolve(students.splice(index, 1)[0]);
        }
        return Promise.reject("Student not found");
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new StudentRepository();