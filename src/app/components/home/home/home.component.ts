import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { ViolationService } from 'src/app/core/services/violation.service';
import { CameraService } from 'src/app/core/services/camera.service';
import { ViolationCountCamera } from 'src/app/shared/models/violationCountCamera';
import { StatisticService } from 'src/app/core/services/statistic.service';
import { Statistics } from 'src/app/shared/models/stats';
import { CameraPercentage } from 'src/app/shared/models/cameraPercentage';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  violationCounts: ViolationCountCamera[];
  camPercentages: CameraPercentage[] = [];
  loading = true;
  stats: any;

  maanden = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  dataTabel = {};

  showViolations = true;
  showCameraViolations = false;
  showUsers = false;
  showLogs = false;
  currentUser: User;

  constructor(private router: Router, private violationService: ViolationService, private cameraService: CameraService, private statService: StatisticService, private authenticationService: AuthenticationService) {
    this.violationService.getViolationCountByCamera().subscribe(res => {
      this.violationCounts = res;
      this.loading = false;
    });

    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user
      console.log(user)
      if (!this.currentUser.passwordChanged) {
        this.router.navigate([{ outlets: { primary: 'resetPass' } }])
      }
    })

    this.statService.getCameraPercentage().subscribe(res => {
      var labels = []
      var percentages = []

      res.map(item => {
        labels.push(item.cameraName)
        percentages.push(item.percentage)
      })

      var dataSets = [{
        data: percentages,
        backgroundColor: [
          'rgba(229,87,23, 0.5)',
          'rgba(182,104,183, 0.5)',
        ],
        borderColor: [
          'rgba(229,87,23,1)',
          'rgba(182,104,183, 1)',
        ],
        borderWidth: 1
      }]

      this.addData(this.myChart2, labels, dataSets)
    });
    this.statService.getRapportStats().subscribe(res => this.stats = res);
  }

  addData(chart, label, data) {
    if (this.currentUser.passwordChanged){
      chart.data.labels = [];
      chart.data.labels = label;
      chart.data.datasets = []
      chart.data.datasets = data
      chart.update();
    }
  }

  activate(type) {
    console.log(type)
    switch (type) {
      case 'showViolations':
        this.showViolations = true;
        this.showCameraViolations = false;
        this.showUsers = false;
        this.showLogs = false;

        this.statService.getStatistics().subscribe(res => {
          var maanden = []

          var violations = [];
          var detected = [];
          var trucksLoaded = [];
          var trucksUnloaded = [];

          res.map(
            item => {
              maanden.push(this.maanden[item.month - 1])
              violations.push(item.totalViolationCount)
              detected.push(item.employeesDetected)
              trucksLoaded.push(item.trucksLoaded)
              trucksUnloaded.push(item.trucksUnloaded)
            }
          )

          var dataSets = [{
            label: "Overtredingen",
            data: violations,
            borderColor: '#B668B7',
            fill: false
          },
          {
            label: "Detecties",
            data: detected,
            borderColor: '#E15517',
            fill: false
          },
          {
            label: "Laden",
            data: trucksLoaded,
            borderColor: '#AE3C37',
            fill: false
          },
          {
            label: "Lossen",
            data: trucksUnloaded,
            borderColor: '#74247A',
            fill: false
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
        this.statService.getEmployeeStats().subscribe(res => {
          var maanden = []
          var data = []

          res.map(
            item => {
              maanden.push(this.maanden[item.month - 1])
              data.push(item.count)
            }
          )

          var dataSets = [{
            label: "Aantal werknemers per maand",
            data: data,
            borderColor: '#B668B7',
            fill: false
          }]
          this.addData(this.myChart, maanden, dataSets)
        })
        break; 
        
        case 'showLogs':
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
  ctx2: any;

  ngAfterViewInit() {


    this.canvas2 = document.getElementById('myChart2');
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.ctx2 = this.canvas2.getContext('2d');

    this.myChart2 = new Chart(this.ctx2, {
      type: 'pie',
      data: {
        labels: [] = [],
        datasets: [] = []
      },
      options: {
        cutoutPercentage: 40,
        responsive: false,

      }
    })

    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [] = [],
        datasets: [] = []
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
