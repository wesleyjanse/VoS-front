import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamerasComponent } from './cameras/cameras.component';
import { MatListModule, MatIconModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule, MatTabsModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastModule, ToastService } from 'src/app/toast';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Camera } from 'src/app/shared/models/camera';
import { CameraDialogComponent } from 'src/app/shared/components/camera-dialog/camera-dialog.component';



@NgModule({
  declarations: [CamerasComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    ToastModule,
    SharedModule,
    NgxQRCodeModule
  ],
  providers: [
    ToastService
  ],
  entryComponents: [
    CameraDialogComponent
  ]
})
export class CamerasModule { }
