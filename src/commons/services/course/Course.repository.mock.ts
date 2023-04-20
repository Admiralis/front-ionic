import {Course} from "../../models";

const courses: Course[] = [
    {
        id: "1",
        label: "POE Java",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-03-31"),
        place: "Salle 2"
    },
    {
        id: "2",
        label: "IDP Angular",
        startDate: new Date("2023-04-01"),
        endDate: new Date("2023-06-30"),
        place: "Inicio - Arobase"
    },
    {
        id: "3",
        label: "POE Big Data",
        startDate: new Date("2023-07-01"),
        endDate: new Date("2023-09-30"),
        place: "Salle 6"
    },
    {
        id: "4",
        label: "IDP JavaScript",
        startDate: new Date("2023-10-01"),
        endDate: null,
        place: null
    },
    {
        id: "5",
        label: "POE React",
        startDate: new Date("2020-01-01"),
        endDate: null,
        place: "Salle 3"
    },
    {
        id: "6",
        label: "IDP Vue.js",
        startDate: new Date("2020-04-01"),
        endDate: new Date("2020-06-30"),
        place: "Salle 4"
    },
    {
        id: "7",
        label: "POE Node.js",
        startDate: new Date("2023-07-01"),
        endDate: null,
        place: null
    },
    {
        id: "8",
        label: "IDP TypeScript",
        startDate: new Date("2020-10-01"),
        endDate: new Date("2020-12-31"),
        place: null
    },
    {
        id: "9",
        label: "POE Admin Linux",
        startDate: new Date("2021-01-01"),
        endDate: null,
        place: null
    },
    {
        id: "10",
        label: "POE Windows Server",
        startDate: new Date("2021-04-01"),
        endDate: null,
        place: null
    }
]

class CourseRepositoryMock {

    /**
     * Retourne tous les cours
     */
    findAll(): Promise<Course[]> {
        return Promise.resolve(courses);
    }

    /**
     * Retourne un cours par son id
     * @param id
     */
    findById(id: string): Promise<Course> {
        let course: Course | undefined = courses.find(course => course.id === id)
        if (course) {
            return Promise.resolve(course);
        }
        return Promise.reject(new Error("Course not found"));
    }

    /**
     * Retourne tous les cours ayant le label demandé
     * @param label
     */
    findByLabel(label: string): Promise<Course[] | undefined> {
        return Promise.resolve(courses.filter(course => course.label === label));
    }

    /**
     * Créé un cours ou le met à jour s'il existe déjà
     * @param newCourse
     */
    save(newCourse: Course): Promise<Course> {
        const index = courses.findIndex(course => course.label === newCourse.label && course.startDate === newCourse.startDate);
        if (index > -1) {
            courses[index] = newCourse;
        } else {
            courses.push(newCourse);
        }
        return Promise.resolve(newCourse);
    }

    /**
     * Ecrase le cours avec les nouvelles informations
     * @param course
     */
    replace(course: Course): Promise<Course> {
        const index = courses.findIndex(c => c.id === course.id);
        if (index > -1) {
            courses[index] = course;
            return Promise.resolve(course);
        }
        return Promise.reject(new Error("Course not found"));
    }

    /**
     * Supprime un cours par son ID
     * @param id
     */
    delete(id: string): Promise<Course> {
        const index = courses.findIndex(c => c.id === id);
        if (index > -1) {
            const course = courses[index];
            courses.splice(index, 1);
            return Promise.resolve(course);
        }
        return Promise.reject(new Error("Course not found"));
    }

    findByLabelAndStartDate(label: string, startDate: Date): Promise<Course> {
        const course = courses.find(course => course.label === label && course.startDate === startDate);
        if (course) {
            return Promise.resolve(course);
        }
        return Promise.reject(new Error("Course not found"));
    }
}

export default new CourseRepositoryMock();