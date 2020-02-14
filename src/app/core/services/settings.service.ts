import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { LogCountByType } from 'src/app/shared/models/LogCountByType';
import { LogItem } from 'src/app/shared/models/LogItem';
import { RFIDCard } from 'src/app/shared/models/rfidCard';
import { UserSettings } from 'src/app/shared/models/userSettings';
import { AppSettings } from 'src/app/shared/models/appSettings';

@Injectable()
export class SettingsService {

    constructor(private _httpClient: HttpClient) { }
    //   Reception/{cardNumber}
    getSettings(userId): Observable<UserSettings> {
        return this._httpClient.get<UserSettings>(`${environment.apiUrl}/Setting/userSettings?id=${userId}`);
    }

    updateSettings(setting): Observable<any> {
        return this._httpClient.put<any>(`${environment.apiUrl}/Setting/updateUserSettings`, setting);
    }


    getAppSettings(): Observable<AppSettings> {
        return this._httpClient.get<AppSettings>(`${environment.apiUrl}/Setting/appSettings`);
    }

}