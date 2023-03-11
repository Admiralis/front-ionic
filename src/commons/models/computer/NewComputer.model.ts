import ComputerComment from "./ComputerComment";

export default interface NewComputer {
    serial: string;
    category: string | null;
    ram: string| null;
    processor: string| null;
    condition: string| null;
    comments: ComputerComment[];
}