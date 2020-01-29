import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatTabsModule } from '@angular/material';
import { ConfirmModelComponent } from './components/confirm-model/confirm-model.component';
import { MatIconModule, MatBadgeModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { MemberDialogComponent } from './components/member-dialog/member-dialog.component'
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CreateFormComponent } from './components/create-form/create-form.component';

@NgModule({
  declarations: [
    ConfirmModelComponent,
    MemberDialogComponent,
    CreateFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    NgxQRCodeModule,
    MatButtonToggleModule
  ],
  exports: [
    RouterModule,
  ],
})
export class SharedModule { }
