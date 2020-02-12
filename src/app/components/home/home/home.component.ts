import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { ViolationService } from 'src/app/core/services/violation.service';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationCountCamera } from 'src/app/shared/models/violationCountCamera';
import { StatisticService } from 'src/app/core/services/statistic.service';
import { Statistics } from 'src/app/shared/models/stats';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  violationCounts: ViolationCountCamera[];
  loading = true;
  stats: any;
  violations = [];
  detected = [];
  trucksLoaded = [];
  trucksUnloaded = [];
  maanden = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  dataTabel = {};

  showViolations = true;
  showCameraViolations = false;
  showUsers = false;
  showLogs = false;

  constructor(private violationService: ViolationService, private cameraService: CameraService, private statService: StatisticService) {
    this.violationService.getViolationCountByCamera().subscribe(res => {
      this.violationCounts = res;
      this.loading = false
    });
    this.statService.getRapportStats().subscribe(res => this.stats = res)
  }

  addData(chart, label, data) {
    console.log(chart.data.labels.length)
    chart.data.labels = [];
    chart.data.labels = label;
    chart.data.datasets = []
    chart.data.datasets = data
    chart.update();
  }

  
  activate(type) {
    console.log(type)
    switch (type) {
      case 'showViolations':
        this.showViolations = true;
        this.showCameraViolations = false;
        this.showUsers = false;
        this.showLogs = false;

        this.statService.getViolationCountByMonth().subscribe(res => {
          console.log(res);
          var maanden = []
          var data = []
          res.map(
            item => {
              maanden.push(this.maanden[item.month - 1])
              data.push(item.count)
            }
          )


          var dataSets = [{
            label: "Overtreding afgelopen jaar",
            data: data,
            backgroundColor: '#B668B7',
          }]
          this.addData(this.myChart, maanden, dataSets)
        })
        break;
      case 'showCameraViolations':
        this.showViolations = false;
        this.showCameraViolations = true;
        this.showUsers = false;
        this.showLogs = false;

        break;

      case 'showUsers':
        this.showViolations = false;
        this.showCameraViolations = false;
        this.showUsers = true;
        this.showLogs = false;
        break; case 'showLogs':
        this.showViolations = false;
        this.showCameraViolations = false;
        this.showUsers = false;
        this.showLogs = true;
        break;
    }
  }


  myChart: Chart;
  myChart2: Chart;
  canvas: any;
  canvas2: any;
  ctx: any;
  ctx2 : any;

  ngAfterViewInit() {


    this.canvas2 = document.getElementById('myChart2');
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.ctx2 = this.canvas2.getContext('2d');

    this.myChart2 = new Chart(this.ctx2, {
      type: 'pie',
      data: {
        labels: ['OK', 'WARNING', 'CRITICAL', 'UNKNOWN'],
        datasets: [{
          label: '# of Tomatoes',
          data: [12, 19, 3, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
         cutoutPercentage: 40,
        responsive: false,
    
      }
    })

    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [] = ['test1', 'test2'],
        datasets: [{
          label: '# of Total Messages',
          data: [] = [],
          backgroundColor: '#ffe4c9',

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

    this.activate('showViolations')

  }

  ngOnInit() {
  }

}
