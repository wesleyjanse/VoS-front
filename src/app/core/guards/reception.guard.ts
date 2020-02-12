import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/security/authentication.service';


@Injectable({ providedIn: 'root' })
export class ReceptionGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser.userRole.roleName.toLowerCase() == "receptionist") {
            // Is admin so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/receptionist'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
