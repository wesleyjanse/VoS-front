import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { Violation } from 'src/app/shared/models/violation';

@Injectable()
export class ViolationService {

    constructor(private _httpClient: HttpClient) { }

    getViolationsByCameraID(camId: number): Observable<Violation[]> {
        return this._httpClient.get<Violation[]>(`${environment.apiUrl}/Violation/ViolationsByCamera?camId=` + camId);
    }

    getViolationCountByCameraID(camId: number) {
        return this._httpClient.get<number[]>(`${environment.apiUrl}/Violation/ViolationCountByCamera?camId=` + camId);
    }
}
