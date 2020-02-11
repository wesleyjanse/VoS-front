import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CameraService } from 'src/app/core/services/camera.service';
import { StatisticService } from 'src/app/core/services/statistic.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    CameraService,
    StatisticService
  ]
})
export class HomeModule { }
