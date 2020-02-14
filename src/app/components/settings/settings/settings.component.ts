import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ToastService } from 'src/app/toast';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { User } from 'src/app/shared/models/user';
import { AppSettings } from 'src/app/shared/models/appSettings';
import { UserSettings } from 'src/app/shared/models/userSettings';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isAdmin = false;
  currentUser: User;
  userSettings: UserSettings;
  appSettings: AppSettings;
  recieveRapport: boolean;

  constructor(private fb: FormBuilder, private settingService: SettingsService, private toast: ToastService, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser.userRole.roleName.toLowerCase() == "admin" || this.currentUser.userRole.roleName.toLowerCase() == "responsible") {
      this.isAdmin = true
    }

    this.settingService.getAppSettings().subscribe(res => this.appSettings = res);
    this.settingService.getSettings(this.currentUser.userID).subscribe(res => {
      this.userSettings = res
      this.recieveRapport = res.receiveRapport;
    })
  }

  onChangeRapport(event) {
    this.recieveRapport != this.recieveRapport;
    console.log(event.checked)

    var setting = {
      userSettingsID: this.userSettings.userSettingsID,
      receiveRapport: event.checked
    }

    this.settingService.updateSettings(setting).subscribe(res => {
      this.toast.show({
        type: "success",
        text: "Settings geüpdatet"
      })
    })
  }
  

  ngOnInit() {
  }

}
