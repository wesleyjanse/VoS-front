import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/core/services/log.service';
import { LogCountByType } from 'src/app/shared/models/LogCountByType';
import { MatTableDataSource } from '@angular/material';
import { LogItem } from 'src/app/shared/models/LogItem';
import * as moment from 'moment';
import 'moment/locale/nl';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  dataSource;
  logCountByType: LogCountByType[];
  loadingCount = true;
  loadingLogs = true;
  displayedColumns: string[] = ['Type', 'Tijd', 'Bericht'];
  moment: any = moment;

  constructor(public logService: LogService) { }

  ngOnInit() {
    this.moment.locale('nl');
    this.logService.getLogCountByType().subscribe(res => {
      this.logCountByType = res;
      this.loadingCount = false;
    });
    this.dataSource = new MatTableDataSource([]);
    this.logService.getCurrentLogs().subscribe(res => {
      this.dataSource = new MatTableDataSource<LogItem>(res);
      this.loadingLogs = false;
      console.log(res);
    })
  }

}
