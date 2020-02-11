import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { Location } from '../../shared/models/location';

@Injectable()
export class CameraService {

  constructor(private _httpClient: HttpClient) { }

  getCameras(): Observable<Camera[]> {
    return this._httpClient.get<Camera[]>(`${environment.apiUrl}/Camera`);
  }

  getCamera(id): Observable<Camera> {
    return this._httpClient.get<Camera>(`${environment.apiUrl}/Camera/${id}` );
  }

  updateCamera(camera: Camera){
    return this._httpClient.put<Camera>(`${environment.apiUrl}/Camera/${camera.cameraID}`, camera)
  }

  createCamera(camera: any){
    return this._httpClient.post<Camera>(`${environment.apiUrl}/Camera`, camera)
  }

  deleteCamera(id){
    return this._httpClient.delete<Camera>(`${environment.apiUrl}/Camera/${id}`)
  }

  getLocations(){
    return this._httpClient.get<Location[]>(`${environment.apiUrl}/Camera/Locations`);
  }
}
