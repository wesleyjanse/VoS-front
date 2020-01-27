import { Camera } from './camera';
import { Employee } from './employee';

export class Violation {
    violationID: number;
    message: string;
    gif: string;
    time: Date;
    employee: Employee[];
    camera: Camera;
}