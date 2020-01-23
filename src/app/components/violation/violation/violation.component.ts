import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationService } from 'src/app/core/services/violation.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Violation } from 'src/app/shared/models/violation';
import { Camera } from 'src/app/shared/models/camera';
import * as moment from 'moment';
import 'moment/locale/nl';

@Component({
  selector: 'app-violation',
  templateUrl: './violation.component.html',
  styleUrls: ['./violation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViolationComponent implements OnInit {
  cameras: Camera[];
  violations: Violation[];
  dataSource = new MatTableDataSource<Violation>(this.violations);
  displayedColumns: string[] = ['Time', 'Message', 'Werknemer', 'Video'];
  moment: any = moment;

  constructor(private cameraService: CameraService, private violationService: ViolationService) {
    this.cameraService.getCameras().subscribe(res => this.cameras = res);
    this.moment.locale('nl');
  }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  getViolations($event) {
    this.violationService.getViolationsByCameraID(this.cameras[$event.index].cameraID).subscribe(res => {
      this.violations = res
      this.dataSource = new MatTableDataSource<Violation>(res);
    })
  }
}



