import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViolationComponent } from './violation/violation.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationService } from 'src/app/core/services/violation.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material'  


@NgModule({
  declarations: [ViolationComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    CameraService,
    ViolationService
  ]
})
export class ViolationModule { }
