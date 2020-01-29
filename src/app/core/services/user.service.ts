import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { User } from 'src/app/shared/models/user';
import { Employee } from 'src/app/shared/models/employee';

@Injectable()
export class UserService {

    constructor(private _httpClient: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this._httpClient.get<User[]>(`${environment.apiUrl}/User`);
    }

    getUser(id) {
        return this._httpClient.get<User>(`${environment.apiUrl}/User/` + id);
    }

    updateUser(user: User) {
        return this._httpClient.put<User>(`${environment.apiUrl}/User/updateUser`, user)
    }

    createUser(user){
        return this._httpClient.post<any>(`${environment.apiUrl}/User`, user)
    }

    createEmployee(employee){
        return this._httpClient.post<any>(`${environment.apiUrl}/Employee`, employee)
    }

    deleteUser(id: number){
        return this._httpClient.delete<User>(`${environment.apiUrl}/User/${id}`)     
    }

    updateEmployee(employee: Employee) {
        return this._httpClient.put<Employee>(`${environment.apiUrl}/Employee/`, employee)
    }

    deleteEmployee(id: number){
        return this._httpClient.delete<Employee>(`${environment.apiUrl}/Employee/${id}`)     
    }

    getEmployee(id) {
        return this._httpClient.get<Employee>(`${environment.apiUrl}/Employee/` + id);
    }

    getEmployees(): Observable<Employee[]> {
        return this._httpClient.get<Employee[]>(`${environment.apiUrl}/Employee`);
    }

    resetPaswoord(id: number){
        return this._httpClient.put<number>(`${environment.apiUrl}/User/resetPassword?userID=${id}`, null);
    }
}