import ComputerComment from "./ComputerComment";

export default interface NewComputer {
    serialNumber: string;
    category: string | null;
    ram: string| null;
    processor: string| null;
    condition: string| null;
    comments: ComputerComment[];
}