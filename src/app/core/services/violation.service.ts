import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { Violation } from 'src/app/shared/models/violation';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { ViolationCountCamera } from 'src/app/shared/models/violationCountCamera';

@Injectable()
export class ViolationService {

    constructor(private _httpClient: HttpClient) { }

    getViolationsByCameraID(camId: number): Observable<Violation[]> {
        return this._httpClient.get<Violation[]>(`${environment.apiUrl}/Violation/ViolationsByCamera?camId=` + camId);
    }

    getViolationCountByCamera(): Observable<ViolationCountCamera[]> {
        return this._httpClient.get<ViolationCountCamera[]>(`${environment.apiUrl}/Violation/ViolationCountByCamera`);
    }
}
