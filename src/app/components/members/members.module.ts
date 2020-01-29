import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { MatTableModule, MatPaginatorModule, MatTabsModule, MatButtonModule, MatListModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';

import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserRoleService } from 'src/app/core/services/userRole.service';
import { ToastService, ToastModule } from 'src/app/toast';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmModelComponent } from 'src/app/shared/components/confirm-model/confirm-model.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';    
import { MemberDialogComponent } from 'src/app/shared/components/member-dialog/member-dialog.component';

@NgModule({
  declarations: [MembersComponent],
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
    UserService,
    UserRoleService,
    ToastService
  ],
  entryComponents: [
    ConfirmModelComponent,
    MemberDialogComponent
  ]
})
export class MembersModule { }
