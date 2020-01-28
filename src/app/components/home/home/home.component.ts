import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { ViolationService } from 'src/app/core/services/violation.service';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationCountCamera } from 'src/app/shared/models/violationCountCamera';
import { StatisticService } from 'src/app/core/services/statistic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  violationCounts: ViolationCountCamera[];
  loading = true;
  violations = [];
  detected = [];
  trucksLoaded = [];
  trucksUnloaded = [];
  maanden = [];
  constructor(private violationService: ViolationService, private cameraService: CameraService, private statService: StatisticService) {
    this.violationService.getViolationCountByCamera().subscribe(res => {
      this.violationCounts = res;
      this.loading = false
    });

  }
  canvas: any;
  ctx: any;

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.statService.getStatistics().subscribe(stats => {
      var tempMaanden =  ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep" ,"Okt", "Nov", "Dec"];
      stats.map(stat => {
        this.violations.push(stat.totalViolationCount);
        this.detected.push(stat.employeesDetected);
        this.trucksLoaded.push(stat.trucksLoaded);
        this.trucksUnloaded.push(stat.trucksUnloaded);
        this.maanden.push(`${tempMaanden[stat.month-1]} ${stat.year}`);
      })
      let myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.maanden,
          datasets: [{
            label: "Aantal overtredingen",
            data: this.violations,
            fill: false,
            borderColor: '#B668B7',
            borderWidth: 0,
          }, {
            label: "Aantal gedetecteerd",
            data: this.detected,
            fill: false,
            borderColor: '#F25C19',
            borderWidth: 0,
          }, {
            label: "Aantal trucks ingeladen",
            data: this.trucksLoaded,
            fill: false,
            borderColor: '#D18889',
            borderWidth: 0,
          }, {
            label: "Aantal trucks uitgeladen",
            data: this.trucksUnloaded,
            fill: false,
            borderColor: '#B774AD',
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    })

  }

  ngOnInit() {
  }

}
