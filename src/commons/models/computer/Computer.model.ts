import ComputerComment from "./ComputerComment";

export default interface Computer {
    id: string;
    serial: string;
    category: string | null;
    ram: string | null;
    processor: string | null;
    condition: string | null;
    comments: ComputerComment[];

}