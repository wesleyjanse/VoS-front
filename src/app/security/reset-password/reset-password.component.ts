import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { ToastService } from 'src/app/toast';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  currentUser: User;

  constructor(private toast: ToastService,private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser.passwordChanged) {
      this.router.navigate([{ outlets: { primary: 'home' } }])
    }
  }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  loginForm = this.fb.group({
    password: new FormControl('', Validators.compose([
      Validators.required
    ])),
    confirmPassword: new FormControl('', Validators.compose([
      Validators.required
    ]))
  });

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.f.password.value !== this.f.confirmPassword.value){
      this.error = "Wachtwoorden komen niet overeen!"
      return;
    }

    this.loading = true;
    this.authenticationService.changePassword(this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toast.show({
            text: `Wachtwoord hersteld!`,
            type: 'success',
          })
          this.authenticationService.logout();
          this.router.navigate(['home'])
        },
        error => {
          console.log(error)
          this.error = error.error.message;
          this.loading = false;
        });
  }
}
