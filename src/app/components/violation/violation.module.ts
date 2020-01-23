import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViolationComponent } from './violation/violation.component';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationService } from 'src/app/core/services/violation.service';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatTabsModule, MatButtonModule } from '@angular/material'


@NgModule({
  declarations: [ViolationComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    CameraService,
    ViolationService
  ]
})
export class ViolationModule { }
