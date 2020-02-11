import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserRoleService } from 'src/app/core/services/userRole.service';
import { User } from '../../models/user';
import { ConfirmModelComponent } from '../confirm-model/confirm-model.component';
import { ToastService } from 'src/app/toast';
import { Employee } from '../../models/employee';
import { DataTableModel } from '../../models/dataTableModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Camera } from '../../models/camera';
import { CameraService } from 'src/app/core/services/camera.service';
import { Location } from '../../models/location';

export interface DialogData {
  camera: DataTableModel,
  new: boolean
}

@Component({
  selector: 'app-camera-dialog',
  templateUrl: './camera-dialog.component.html',
  styleUrls: ['./camera-dialog.component.scss']
})
export class CameraDialogComponent implements OnInit {
  selectedCamera: Camera;
  loading = false;
  submitted = false;
  camera: Camera;
  active: boolean;
  locations: Location[];
  toggleOptions: Array<String> = ["Actief", "Inactief"];
  selectedValue: String;
  ngOnInit() {
    this.cameraForm = this.fb.group({
      name: ['', [Validators.required]],
      macAddress: ['', [Validators.required]],
      model: ['', [Validators.required]],
      location: ['Kies...', [Validators.required]],
      ipAddress: ['', [Validators.required]],
    });
  }

  selectionChanged(item) {
    this.selectedValue = item.value;
    this.active = !this.active;
  }

  deleteCamera() {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      width: '400px',
      data: {
        title: `Verwijder ${this.camera.cameraName}`,
        info: `Bent u zeker dat u *${this.camera.cameraName} op locatie: ${this.camera.location.description}* wilt verwijder?`
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.cameraService.deleteCamera(this.camera.cameraID).subscribe(res => {
            this.toast.show({
              text: `Camera verwijderd!`,
              type: 'info',
            })
          })
        this.dialogRef.close(true);
        }
      }
    );
  }

  cameraForm: FormGroup;
  get f() { return this.cameraForm.controls; }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CameraDialogComponent>,
    private cameraService: CameraService,
    private fb: FormBuilder,
    private toast: ToastService) {

    // console.log(this.data.camera)
    this.cameraService.getLocations().subscribe(res => {
      this.locations = res
      if (!this.data.new) {
        this.cameraService.getCamera(data.camera).subscribe(res => {
          this.camera = res;
          this.selectedValue = res.isActive ? "Actief" : "Inactief"
          this.f.name.setValue(this.camera.cameraName)
          this.f.macAddress.setValue(this.camera.macAddress)
          this.f.macAddress.disable()
          this.f.model.setValue(this.camera.model)
          this.f.model.disable()
          this.f.location.setValue(this.camera.location.description)
          this.f.ipAddress.setValue(this.camera.ipAddress)
          this.active = res.isActive;
          this.f.location.setValue(this.camera.location.locationID)
        })
      } else{
        this.selectedValue =  "Actief";
        this.active = true;
      }
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.cameraForm.invalid || this.f.location.value == "Kies...") {
      return;
    }

    this.loading = true;

    if (!this.data.new) {
      var updateCamera: Camera = {
        cameraID: this.camera.cameraID,
        cameraName: this.f.name.value,
        ipAddress: this.f.ipAddress.value,
        isActive: this.active,
        location: this.locations.find(location => location.locationID == this.f.location.value),
        macAddress: this.camera.macAddress,
        model: this.camera.model,
      }
      
      console.log(updateCamera)

      this.cameraService.updateCamera(updateCamera).subscribe(res => {
        this.loading = false;
        this.toast.show({
          text: `Camera geüpdatet!`,
          type: 'success',
        })
        this.dialogRef.close(true);
      })
    } else{
      var newCamera = {
        cameraName: this.f.name.value,
        ipAddress: this.f.ipAddress.value,
        isActive: this.active,
        location: this.locations.find(location => location.locationID == this.f.location.value),
        macAddress: this.f.macAddress.value,
        model: this.f.model.value,
        violations: null
      }
      
      console.log(newCamera)

      this.cameraService.createCamera(newCamera).subscribe(res => {
        this.loading = false;
        this.toast.show({
          text: `Camera aangemaakt!`,
          type: 'info',
        })
        this.dialogRef.close(true);
      })
    }
  }
}
