import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();

        const storedUser: any = JSON.parse(localStorage.getItem('currentUser'));

        if (storedUser) {
            let { token, ...userDetails } = storedUser;
            this.storeUser(userDetails, token);
        }
    }

    public get currentUserValue(): User {
        console.log(this.currentUserSubject.value)
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/Authenticate/authenticate`, { email, password })
            .pipe(map(response => {
                this.storeUser(response, response.token)
            })
        );
    }

    //   register(firstname: string, lastname: string, email: string, password: string) {
    //     return this.http.post<any>(`${environment.apiUrl}/users`, { firstname, lastname, email, password })
    //       .pipe(map(response => {
    //         if (!this.currentUserValue || !this.currentUserValue.isAdmin) {
    //           this.storeUser(response.user, response.token)
    //         }
    //       }));
    //   }

    registerUser(firstname: string, lastname: string, email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users`, { firstname, lastname, email, password })
    }

    registerAdmin(firstname: string, lastname: string, email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/admins`, { firstname, lastname, email, password })
    }

    //   changePassword(oldpassword: string, newpassword: string) {
    //     return this.http.put<any>(`${environment.apiUrl}/users/${this.currentUserValue._id}/password`, { password: oldpassword, newPassword: newpassword })
    //       .pipe(map(() => this.deteleUserTokens()));
    //   }

    logout() {
        this.currentUserSubject.next(null);
        localStorage.clear();
    }

    async refreshCurrentUser() {
        return new Promise((resolve) => {
            this.http.get(`${environment.apiUrl}/users/${this.currentUserValue.userID}`)
                .subscribe((user => {
                    const currentToken = this.currentUserValue.token;
                    this.storeUser(
                        user,
                        currentToken
                    );
                    resolve(user);
                }));
        });
    }

    storeUser(userDetais, token) {
        const user: User = new User({
            userID: userDetais.userID,
            email: userDetais.email,
            firstname: userDetais.firstname,
            name: userDetais.name,
            userRole: userDetais.userRole,
        }, token);

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        return user;
    }
}
