import {Course} from "../../models";

class CourseRepository {
    private url = 'http://localhost/api/courses';

    async findAll(): Promise<Course[]> {
        const response = await fetch(this.url);
        return await response.json();
    }

    async findById(id: string): Promise<Course> {
        const response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }

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

    async findByLabelAndStartDate(label: string, startDate: Date): Promise<Course> {
        const response = await fetch(`${this.url}/search?label=${label}&startDate=${startDate}`);
        return await response.json();
    }

}

export default new CourseRepository();