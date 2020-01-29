import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs/logs.component';
import { LogService } from 'src/app/core/services/log.service';
import { MatTableModule } from '@angular/material';



@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  providers: [
    LogService
  ],
})
export class LogsModule { }
