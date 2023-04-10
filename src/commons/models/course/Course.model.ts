interface Course {
    id: string | null;
    label: string;
    startDate: Date;
    endDate: Date | null;
    place: string | null;
}

export default Course;