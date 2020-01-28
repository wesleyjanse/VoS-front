import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../shared/models/camera';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Injectable()
export class CameraService {

  constructor(private _httpClient: HttpClient) { }

  getCameras(): Observable<Camera[]> {
    return this._httpClient.get<Camera[]>(`${environment.apiUrl}/Camera`);
  }

//   getPollsByMemberID(memberID: number): Observable<PollMember[]>{
//     return this._httpClient.get<PollMember[]>("https://apolly-backend20191125052638.azurewebsites.net/api/PollMembers/getAllByMemberId/" + memberID)
//   }

//   getCreatorFromPoll(pollID: number): Observable<Member> {
//     return this._httpClient.get<Member>("https://apolly-backend20191125052638.azurewebsites.net/api/PollMembers/getCreatorByPollId/" + pollID);
//   }
//   getPoll(pollID: number) {
//     return this._httpClient.get<Poll>("https://apolly-backend20191125052638.azurewebsites.net/api/poll/" + pollID);
//   }

//   getPollMemberByPollID(pollID: number) {
//     return this._httpClient.get<PollMember>("https://apolly-backend20191125052638.azurewebsites.net/api/PollMembers/getPollMemberByPollId/" + pollID);
//   }

//   updatePoll(pollID: number, poll: Poll){
//     return this._httpClient.put<Poll>("https://apolly-backend20191125052638.azurewebsites.net/api/Poll/" + pollID, poll);
//   }

//   addPoll(poll: Poll): Observable<Poll>{
//     return this._httpClient.post<Poll>("https://apolly-backend20191125052638.azurewebsites.net/api/Poll/", poll);
//   }

//   addPollMember(pollMember: PollMember){
//     return this._httpClient.post<PollMember>("https://apolly-backend20191125052638.azurewebsites.net/api/pollmembers", pollMember)
//   }

//   deletePoll(pollID: number){
//     return this._httpClient.delete<PollMember>("https://apolly-backend20191125052638.azurewebsites.net/api/poll/" + pollID)
//   }
}
