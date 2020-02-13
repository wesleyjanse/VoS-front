import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { User } from 'src/app/shared/models/user';
import { Employee } from 'src/app/shared/models/employee';
import { Statistics } from 'src/app/shared/models/stats';
import { DayStats } from 'src/app/shared/models/DayStats';
import { ViolationsByMonth } from 'src/app/shared/models/violationsByMonth';
import { CameraPercentage } from 'src/app/shared/models/cameraPercentage';
import { EmployeeStats } from 'src/app/shared/models/employeeStats';


@Injectable()
export class StatisticService {

  constructor(private _httpClient: HttpClient) { }

  getStatistics(): Observable<Statistics[]> {
    return this._httpClient.get<Statistics[]>(`${environment.apiUrl}/Statistics/getLastYear`);
  }

  getStatisticsById(id): Observable<Statistics> {
    return this._httpClient.get<Statistics>(`${environment.apiUrl}/Statistics/${id}`);
  }

  getMonthStats(): Observable<DayStats[]> {
    return this._httpClient.get<DayStats[]>(`${environment.apiUrl}/Statistics/monthStats`);
  }

  getRapportStats(): Observable<DayStats[]> {
    return this._httpClient.get<DayStats[]>(`${environment.apiUrl}/Statistics/rapportStats`);
  }

  getViolationCountByMonth(): Observable<ViolationsByMonth[]> {
    return this._httpClient.get<ViolationsByMonth[]>(`${environment.apiUrl}/Statistics/violationCountByMonth`);
  }

  getCameraPercentage(): Observable<CameraPercentage[]> {
    return this._httpClient.get<CameraPercentage[]>(`${environment.apiUrl}/Statistics/violationPercentageByCam`);
  }

  getEmployeeStats(): Observable<EmployeeStats[]> {
    return this._httpClient.get<EmployeeStats[]>(`${environment.apiUrl}/Statistics/personnelCountByMonth`);
  }

}