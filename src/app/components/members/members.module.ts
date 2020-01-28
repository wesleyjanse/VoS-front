import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { MatTableModule, MatPaginatorModule, MatTabsModule, MatButtonModule, MatListModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { EditMemberComponent } from './edit-member/edit-member.component';


@NgModule({
  declarations: [MembersComponent, EditMemberComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [
    UserService
  ]
})
export class MembersModule { }
