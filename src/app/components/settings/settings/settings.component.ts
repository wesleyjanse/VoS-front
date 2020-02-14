import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ToastService } from 'src/app/toast';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { User } from 'src/app/shared/models/user';
import { AppSettings } from 'src/app/shared/models/appSettings';
import { UserSettings } from 'src/app/shared/models/userSettings';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

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
  streamIsEnabled: boolean;
  isSafe: boolean;
  alwaysCheckMovement: boolean;
  loading = false;

  constructor(private fb: FormBuilder, private settingService: SettingsService, private toast: ToastService, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser.userRole.roleName.toLowerCase() == "admin" || this.currentUser.userRole.roleName.toLowerCase() == "responsible") {
      this.isAdmin = true
    }

    this.f.fps.valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(val => {
      var setting = {
        settingsID: this.appSettings.settingsID,
        fps: val,
        streamIsEnabled: this.streamIsEnabled,
        durationDelete: this.f.durationDelete.value,
        isSafe: this.isSafe,
        autoRefresh: this.f.autoRefresh.value,
        alwaysCheckMovement: this.alwaysCheckMovement
      }

      if (val != this.appSettings.fps) {
        this.settingService.updateAppSettings(setting).subscribe(res => {
          this.loading = false;
          this.toast.show({
            type: "success",
            text: "Settings geüpdatet"
          })
        })
      }
    })

    this.f.durationDelete.valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(val => {
      var setting = {
        settingsID: this.appSettings.settingsID,
        fps: this.f.fps.value,
        streamIsEnabled: this.streamIsEnabled,
        durationDelete: val,
        isSafe: this.isSafe,
        autoRefresh: this.f.autoRefresh.value,
        alwaysCheckMovement: this.alwaysCheckMovement
      }

      if (val != this.appSettings.durationDelete) {
        this.settingService.updateAppSettings(setting).subscribe(res => {
          this.loading = false;
          this.toast.show({
            type: "success",
            text: "Settings geüpdatet"
          })
        })
      }
    })

    this.f.autoRefresh.valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(val => {
      var setting = {
        settingsID: this.appSettings.settingsID,
        fps: this.f.fps.value,
        streamIsEnabled: this.streamIsEnabled,
        durationDelete: this.f.durationDelete.value,
        isSafe: this.isSafe,
        autoRefresh: val,
        alwaysCheckMovement: this.alwaysCheckMovement
      }

      if (val != this.appSettings.autoRefresh) {
        this.settingService.updateAppSettings(setting).subscribe(res => {
          this.loading = false;
          this.toast.show({
            type: "success",
            text: "Settings geüpdatet"
          })
        })
      }
    })

    this.settingService.getAppSettings().subscribe(res => {
      this.appSettings = res
      this.streamIsEnabled = res.streamIsEnabled;
      this.isSafe = res.isSafe;
      this.alwaysCheckMovement = res.alwaysCheckMovement;
      this.f.fps.setValue(res.fps)
      this.f.durationDelete.setValue(res.durationDelete)
      this.f.autoRefresh.setValue(res.autoRefresh)
    });
    this.settingService.getSettings(this.currentUser.userID).subscribe(res => {
      this.userSettings = res
      this.recieveRapport = res.receiveRapport;
    })
  }

  onChangeRapport(event) {
    this.loading = true;
    this.recieveRapport != this.recieveRapport;

    var setting = {
      userSettingsID: this.userSettings.userSettingsID,
      receiveRapport: event.checked
    }

    this.settingService.updateSettings(setting).subscribe(res => {
      this.loading = false;
      this.toast.show({
        type: "success",
        text: "Settings geüpdatet"
      })
    })
  }

  onChangeSafe(event) {
    this.loading = true;
    this.isSafe = event.checked;

    var setting = {
      settingsID: this.appSettings.settingsID,
      fps: this.f.fps.value,
      streamIsEnabled: this.streamIsEnabled,
      durationDelete: this.f.durationDelete.value,
      isSafe: this.isSafe,
      autoRefresh: this.f.autoRefresh.value,
      alwaysCheckMovement: this.alwaysCheckMovement
    }

    this.settingService.updateAppSettings(setting).subscribe(res => {
      this.loading = false;
      this.toast.show({
        type: "success",
        text: "Settings geüpdatet"
      })
    })
  }


  onChangeDetect(event) {
    this.loading = true;
    this.alwaysCheckMovement = event.checked;

    var setting = {
      settingsID: this.appSettings.settingsID,
      fps: this.f.fps.value,
      streamIsEnabled: this.streamIsEnabled,
      durationDelete: this.f.durationDelete.value,
      isSafe: this.isSafe,
      autoRefresh: this.f.autoRefresh.value,
      alwaysCheckMovement: this.alwaysCheckMovement
    }

    this.settingService.updateAppSettings(setting).subscribe(res => {
      this.loading = false;
      this.toast.show({
        type: "success",
        text: "Settings geüpdatet"
      })
    })
  }


  onChangeStream(event) {
    this.loading = true;
    this.streamIsEnabled = event.checked;

    var setting = {
      settingsID: this.appSettings.settingsID,
      fps: this.f.fps.value,
      streamIsEnabled: this.streamIsEnabled,
      durationDelete: this.f.durationDelete.value,
      isSafe: this.isSafe,
      autoRefresh: this.f.autoRefresh.value,
      alwaysCheckMovement: this.alwaysCheckMovement
    }

    this.settingService.updateAppSettings(setting).subscribe(res => {
      this.loading = false;
      this.toast.show({
        type: "success",
        text: "Settings geüpdatet"
      })
    })
  }

  get f() { return this.appSettingsForm.controls; }

  appSettingsForm = this.fb.group({
    fps: new FormControl(0, Validators.compose([
      Validators.required
    ])),
    durationDelete: new FormControl(0, Validators.compose([
      Validators.required
    ])),
    autoRefresh: new FormControl(0, Validators.compose([
      Validators.required
    ])),
  });

  ngOnInit() {
  }

  onSubmit() {

  }

}
