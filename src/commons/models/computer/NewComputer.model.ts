import ComputerComment from "./ComputerComment";

export default interface NewComputer {
    serial: string;
    category?: string;
    ram?: string;
    processor?: string;
    condition?: string;
    comments?: ComputerComment[];
}