import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { MatFormFieldModule, MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from 'src/app/toast';
import { SettingsService } from 'src/app/core/services/settings.service';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,    
    MatSlideToggleModule,
  ],
  providers: [
    ToastService,
    SettingsService
  ]
})
export class SettingsModule { }
