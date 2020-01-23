import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './security/authentication.service';
import { User } from './shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'VoS-Front';
  name = 'Admin';
  letter = '';
  isLoggedIn = false;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private router: Router){
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user
      if (user != null) {
        this.isLoggedIn = true;
        this.name = user.firstname;
        this.letter = this.name.substr(0,1);
        if (this.router.url === 'login'){
          this.router.navigate([{outlets: {primary: 'home'}}])
        }
      } else{
        this.router.navigate([{outlets: {login: 'login'}}])
      }
    })
  }

  logout(){
    this.isLoggedIn = false;
    this.authenticationService.logout();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.letter = this.name.substr(1);
  }
}
