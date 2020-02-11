import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViolationComponent, DialogDataExampleDialog } from './violation/violation.component';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationService } from 'src/app/core/services/violation.service';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatTabsModule, MatButtonModule } from '@angular/material'
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule, MatProgressBarModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [ViolationComponent, DialogDataExampleDialog],
  imports: [
    CommonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatDialogModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  providers: [
    CameraService,
    ViolationService
  ],
  entryComponents: [
    DialogDataExampleDialog
  ]
})
export class ViolationModule { }
