import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/security/authentication.service';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser.userRole.roleName.toLowerCase() == "admin" || currentUser.userRole.roleName.toLowerCase() == "responsible") {
            // Is admin so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        var url = currentUser.userRole.roleName.toLowerCase() == "receptionist" ? "/reception" : "/home"
        this.router.navigate([url], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
