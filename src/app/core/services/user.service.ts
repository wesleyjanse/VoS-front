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

  getEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(`${environment.apiUrl}/Employee`);
  }
}