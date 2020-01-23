import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
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
