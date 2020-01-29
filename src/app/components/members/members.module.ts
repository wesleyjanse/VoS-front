import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { MatTableModule, MatPaginatorModule, MatTabsModule, MatButtonModule, MatListModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [MembersComponent, EditMemberComponent, EditEmployeeComponent],
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
    AngularSvgIconModule
  ],
  providers: [
    UserService
  ]
})
export class MembersModule { }
