import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { User } from 'src/app/shared/models/user';
import { Employee } from 'src/app/shared/models/employee';
import { Statistics } from 'src/app/shared/models/stats';


@Injectable()
export class StatisticService {

  constructor(private _httpClient: HttpClient) { }

  getStatistics(): Observable<Statistics[]> {
    return this._httpClient.get<Statistics[]>(`${environment.apiUrl}/Statistics/getLastYear`);
  }
}