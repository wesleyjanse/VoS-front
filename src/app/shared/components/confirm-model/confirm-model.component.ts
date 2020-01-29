import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/components/violation/violation/violation.component';

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.scss']
})
export class ConfirmModelComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
