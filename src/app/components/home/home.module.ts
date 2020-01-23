import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CameraService } from 'src/app/core/services/camera.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule
  ],
  providers: [
    CameraService
  ]
})
export class HomeModule { }
