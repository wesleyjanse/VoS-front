import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { ViolationService } from 'src/app/core/services/violation.service';
import { CameraService } from 'src/app/core/services/camera.service';
import { Camera } from 'src/app/shared/models/camera';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  violationCounts = [];
  cameras: Camera[];
  loading = true;

  constructor(private violationService: ViolationService, private cameraService: CameraService) {
    this.cameraService.getCameras().subscribe(res => {
      this.cameras = res
      this.cameras.map(cam => {
        this.violationService.getViolationCountByCameraID(cam.cameraID).subscribe(res => {
          this.violationCounts.push(res)
          this.loading = false;
        });
      })
    });
    
  }
  canvas: any;
  ctx: any;

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "Oktober", "November", "December"],
        datasets: [{
          label: "Aantal overtredingen",
          data: [10, 5, 4, 8, 2, 0, 7, 4, 6, 7, 3, 1],
          backgroundColor: '#B668B7',
          borderWidth: 0,
        }]
      },

      options: {
        responsive: true,
        display: true,
        maintainAspectRatio: false
      }
    });
  }




  ngOnInit() {
  }

}
