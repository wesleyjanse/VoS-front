import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationService } from 'src/app/core/services/violation.service';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Violation } from 'src/app/shared/models/violation';
import { Camera } from 'src/app/shared/models/camera';
import * as moment from 'moment';
import 'moment/locale/nl';
import { tap } from 'rxjs/operators';
import { interval } from 'rxjs';

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
  loading = false;
  loadingCameras = true;
  displayedColumns: string[] = ['Time', 'Message', 'Werknemer', 'Video'];
  moment: any = moment;

  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(private cameraService: CameraService, private violationService: ViolationService, public dialog: MatDialog) {
    this.cameraService.getCameras().subscribe(res => {
      this.cameras = res
      this.loadingCameras = false;
    
    });
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
    this.loading = true;
    this.violationService.getViolationsByCameraID(this.cameras[$event.index].cameraID).subscribe(res => {
      console.log('violations', res)
      this.violations = res
      this.dataSource = new MatTableDataSource<Violation>(res);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })
  }
}

//Dialogbox
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-video.html',
  styleUrls: ['./video.component.scss'],
})
export class DialogDataExampleDialog {
  progressbarValue = 0;
  curSec: number = 0;

  startTimer(seconds: number) {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 0 + sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        this.startTimer(seconds)
      }
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.startTimer(34)
  }
  moment: any = moment;
  ngOnInit(): void {
    this.moment.locale('nl');
  }
}

export interface DialogData {
}