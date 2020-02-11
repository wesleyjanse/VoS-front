import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatTabsModule, MatFormFieldModule } from '@angular/material';
import { ConfirmModelComponent } from './components/confirm-model/confirm-model.component';
import { MatIconModule, MatBadgeModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { MemberDialogComponent } from './components/member-dialog/member-dialog.component'
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { CameraDialogComponent } from './components/camera-dialog/camera-dialog.component';

@NgModule({
  declarations: [
    ConfirmModelComponent,
    MemberDialogComponent,
    CreateFormComponent,
  CameraDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatTabsModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    NgxQRCodeModule,
    MatButtonToggleModule
  ],
  exports: [
    RouterModule,
    ConfirmModelComponent
  ],
})
export class SharedModule { }
