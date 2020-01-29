import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatTabsModule } from '@angular/material';
import { ConfirmModelComponent } from './components/confirm-model/confirm-model.component';
import { MatIconModule, MatBadgeModule, MatButtonModule } from '@angular/material';
import { MemberDialogComponent } from './components/member-dialog/member-dialog.component'
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ConfirmModelComponent,
  MemberDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    AngularSvgIconModule
  ],
  exports: [
    RouterModule,
  ],
})
export class SharedModule { }
