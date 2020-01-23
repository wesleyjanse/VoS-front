import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    DialogboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ],
  exports: [
    RouterModule,
  ],
})
export class SharedModule { }
