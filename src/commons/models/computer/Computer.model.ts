import ComputerComment from "./ComputerComment";

export enum ComputerStatus {
    AVAILABLE = "AVAILABLE",
    IN_USE = "IN_USE",
    UNAVAILABLE = "UNAVAILABLE"
}

export default interface Computer {
    id?: string;
    serialNumber: string;
    category: string | null;
    ram: string | null;
    processor: string | null;
    condition: string | null;
    comments: ComputerComment[];
    status?: ComputerStatus;

}