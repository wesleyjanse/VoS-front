import { Camera } from './camera';
import { Employee } from './employee';
import { EmployeeViolation } from './employeeViolation';

export class Violation {
    violationID: number;
    message: string;
    gif: string;
    time: Date;
    employeeViolation: EmployeeViolation;
    camera: Camera;
}