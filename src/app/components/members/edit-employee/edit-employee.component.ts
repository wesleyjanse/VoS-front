import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { 
    let employeeId = this.route.snapshot.paramMap.get("id")
    console.log(employeeId)
  }
  
  ngOnInit() {
  }

}
