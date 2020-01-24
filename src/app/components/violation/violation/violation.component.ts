import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationService } from 'src/app/core/services/violation.service';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Violation } from 'src/app/shared/models/violation';
import { Camera } from 'src/app/shared/models/camera';
import * as moment from 'moment';
import 'moment/locale/nl';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-violation',
  templateUrl: './violation.component.html',
  styleUrls: ['./violation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViolationComponent {
  cameras: Camera[];
  violations: Violation[];
  dataSource;
  displayedColumns: string[] = ['Time', 'Message', 'Werknemer', 'Video'];
  moment: any = moment;

  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(private cameraService: CameraService, private violationService: ViolationService, public dialog: MatDialog) {
    this.cameraService.getCameras().subscribe(res => this.cameras = res);
    this.moment.locale('nl');
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(violation) {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        violation
      }
    });
  }

  getViolations($event) {
    console.log(this.dataSource)
    this.violationService.getViolationsByCameraID(this.cameras[$event.index].cameraID).subscribe(res => {
      this.violations = res
      this.dataSource = new MatTableDataSource<Violation>(res);
      this.dataSource.paginator = this.paginator;
    })
  }
}



//Dialogbox
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-video.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  moment: any = moment;
  ngOnInit(): void {
    this.moment.locale('nl');
  }
}

export interface DialogData {
}