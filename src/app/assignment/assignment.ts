import { Time } from "@angular/common";

export interface Assignment {
    id: number;
    courseID: number;
    assignmentName: string;
    courseName: string;
    dueDate: String;
    scoredPoints: number;
    possiblePoints: number;
    description: string;
}