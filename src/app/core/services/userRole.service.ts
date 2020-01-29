import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { User } from 'src/app/shared/models/user';
import { Employee } from 'src/app/shared/models/employee';
import { UserRole } from 'src/app/shared/models/userRole';

@Injectable()
export class UserRoleService {

  constructor(private _httpClient: HttpClient) { }

  getRoles(): Observable<UserRole[]> {
    return this._httpClient.get<UserRole[]>(`${environment.apiUrl}/User/userRoles`);
  }

}