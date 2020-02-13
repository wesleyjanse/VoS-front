import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './security/authentication.service';
import { User } from './shared/models/user';
import { Router } from '@angular/router';
import { ToastService } from './toast/toast.service';
import { Notification } from './shared/models/notification';
import { NotificationService } from './core/services/notification.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MemberDialogComponent } from './shared/components/member-dialog/member-dialog.component';
import { ConfirmModelComponent } from './shared/components/confirm-model/confirm-model.component';

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
  isAdmin = false;
  isSecurity = false;
  isReception = false;
  notifications: Notification[];
  notifCount = 0;
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<MemberDialogComponent>, private toast: ToastService, private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) {

    if(this.authenticationService.currentUserValue){
      this.authenticationService.isLoggedIn.next(true);
    }

    this.authenticationService.isLoggedIn.subscribe(e => {
      this.isLoggedIn = e? true: false;

      this.authenticationService.currentUser.subscribe(user => {
        if (user != null) {
          this.currentUser = user;
          if (this.currentUser.userRole.roleName.toLowerCase() == 'admin') { this.isAdmin = true; this.isSecurity = false; this.isReception = false }
          if (this.currentUser.userRole.roleName.toLowerCase() == 'responsible') { this.isSecurity = true; this.isAdmin = false; this.isReception = false }
          if (this.currentUser.userRole.roleName.toLowerCase() == 'receptionist') { this.isReception = true; this.isAdmin = false; this.isSecurity = false }
          this.name = user.firstname;
          this.letter = this.name.substr(0, 1);
          this.getNotifications()
          console.log(this.currentUser)
          if (!this.currentUser.passwordChanged) {
            this.router.navigate([{ outlets: { primary: 'resetPass' } }])
          }
          else if (this.router.url === 'login') {
            if (this.isReception) {
              this.router.navigate([{ outlets: { primary: 'reception' } }])
            } else {
              this.router.navigate([{ outlets: { primary: 'home' } }])
            }
          }
        } else {
          this.router.navigate([{ outlets: { login: 'login' } }])
        }
      })
    })
  }

  getNotifications() {
    this.notificationService.getNotificationById(this.currentUser.userID).subscribe(res => {
      this.notifications = res
      this.notifCount = res.filter(notif => !notif.notificationSeen).length;
    })
  }

  logout() {
    this.isLoggedIn = false;
    this.authenticationService.logout();
  }

  settings() {
    this.router.navigate(['settings'])
  }

  navigateNotif(notif: Notification) {
    switch (notif.type) {
      case 'Violation':
        this.notificationService.updateNotifSeen(notif.notificationID).subscribe(res => {
          this.toast.show({
            text: `Notificaties geüpdatet!`,
            type: 'info',
          })
          this.getNotifications();
          this.router.navigate(['violations'])
        });
        break;
    }
  }

  clearAll() {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      width: '400px',
      data: {
        title: `Lees alle notificaties?`,
        info: `Bent u zeker dat u alle notificaties wilt lezen?`
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.notificationService.updateAllNotifSeen(this.currentUser.userID).subscribe(res => {
            this.toast.show({
              text: `Alle notifications gelezen!`,
              type: 'info',
            })
            this.getNotifications();
          });
        }
      }
    );

  }

  ngOnInit() {

  }
}
