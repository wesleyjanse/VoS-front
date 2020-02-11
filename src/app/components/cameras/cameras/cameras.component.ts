import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { DataTableModel } from 'src/app/shared/models/dataTableModel';
import { CreateFormComponent } from 'src/app/shared/components/create-form/create-form.component';
import { MemberDialogComponent } from 'src/app/shared/components/member-dialog/member-dialog.component';
import { Camera } from 'src/app/shared/models/camera';
import { CameraService } from 'src/app/core/services/camera.service';
import { CameraDialogComponent } from 'src/app/shared/components/camera-dialog/camera-dialog.component';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {
  data = [];
  dataSource;
  displayedColumns: string[] = ['Id', 'Name', 'MacAddress', 'Model', 'IpAddress', 'Location', 'Actions'];
  loading = false;


  constructor(public dialog: MatDialog, private cameraService: CameraService, private router: Router) {
  }

  
  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  ngOnInit() {
    this.loading = true;
    this.dataSource = new MatTableDataSource([]);
    this.data = []
    this.cameraService.getCameras().subscribe(res => {
      this.dataSource = res
      this.loading = false;
    });
  }

  newCamera(){
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      data: {
        width: '500px',
        new: true
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.ngOnInit();
        }
      }
    );
  }

  open(element) {
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      data: {
        width: '350px',
        camera: element.cameraID,
        new: false
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.ngOnInit();
        }
      }
    );
  }

}
