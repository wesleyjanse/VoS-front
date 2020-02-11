import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/shared/models/notification';


@Injectable()
export class NotificationService {

    constructor(private _httpClient: HttpClient) { }

    getNotificationById(id): Observable<Notification[]> {
        return this._httpClient.get<Notification[]>(`${environment.apiUrl}/Notification/${id}`);
    }

    updateNotifSeen(id) {
        return this._httpClient.put<Notification>(`${environment.apiUrl}/Notification/seenNotification?id=${id}`, null);
    }

    updateAllNotifSeen(id) {
        return this._httpClient.put<Notification>(`${environment.apiUrl}/Notification/seenAllNotifications?id=${id}`, null);
    }

}