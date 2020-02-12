import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { LogCountByType } from 'src/app/shared/models/LogCountByType';
import { LogItem } from 'src/app/shared/models/LogItem';
import { RFIDCard } from 'src/app/shared/models/rfidCard';

@Injectable()
export class ReceptionService {

    constructor(private _httpClient: HttpClient) { }
    //   Reception/{cardNumber}
    getRFID(cardNumber): Observable<RFIDCard> {
        return this._httpClient.get<RFIDCard>(`${environment.apiUrl}/Reception/cardNumber?number=${cardNumber}`);
    }

    updateRFID(card: RFIDCard){
        return this._httpClient.put<RFIDCard>(`${environment.apiUrl}/Reception/${card.rfidCardID}`, card);
    }

}