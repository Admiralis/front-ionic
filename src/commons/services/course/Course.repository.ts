import {Course} from "../../models";

class CourseRepository {
    private url = `http://${localStorage.getItem('ip')}/api/courses` || 'http://localhost/api/courses';

    /**
     * Récupère la liste des cours
     */
    async findAll(): Promise<Course[]> {
        const response = await fetch(this.url);
        return await response.json();
    }

    /**
     * Récupère un cours par son id
     * @param id
     */
    async findById(id: string): Promise<Course> {
        const response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }

    /**
     * Enregistre un cours
     * @param course
     */
    async save(course: Course): Promise<Course> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        });
        return await response.json();
    }

    /**
     * Recherche un cours par son label et sa date de début
     * @param label
     * @param startDate
     */
    async findByLabelAndStartDate(label: string, startDate: Date): Promise<Course> {
        const response = await fetch(`${this.url}/search?label=${label}&startDate=${startDate}`);
        return await response.json();
    }

    async findInProgressByLabel(label?: string): Promise<Course[]> {
        if (!label) {
            const response = await fetch(`${this.url}/in-progress`);
            return await response.json();
        } else {
            const response = await fetch(`${this.url}/in-progress?label=${label}`);
            return await response.json();
        }
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CourseRepository();