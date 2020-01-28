import { Employee } from './employee'
import { Violation } from './violation';

export class EmployeeViolation {
    employeeViolationID: number;
    employee: Employee;
    violation: Violation;
}