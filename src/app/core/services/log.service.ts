import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { LogCountByType } from 'src/app/shared/models/LogCountByType';
import { LogItem } from 'src/app/shared/models/LogItem';

@Injectable()
export class LogService {

  constructor(private _httpClient: HttpClient) { }

  getLogCountByType(): Observable<LogCountByType[]> {
    return this._httpClient.get<LogCountByType[]>(`${environment.apiUrl}/Log/logCountByType`);
  }
  getCurrentLogs(): Observable<LogItem[]> {
    return this._httpClient.get<LogItem[]>(`${environment.apiUrl}/Log/getLogs`);
  }
}