import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService) {

    if (this.authenticationService.currentUserValue) {
      // console.log(this.authenticationService.currentUserValue)
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  loginForm = this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required
    ]))
  });

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([{outlets: {primary: 'home'}}])
        },
        error => {
          console.log(error)
          this.error = error.error.message;
          this.loading = false;
        });
  }
}
