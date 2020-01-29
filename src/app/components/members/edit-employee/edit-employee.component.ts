import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { UserRoleService } from 'src/app/core/services/userRole.service';
import { ToastService } from 'src/app/toast';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmModelComponent } from 'src/app/shared/components/confirm-model/confirm-model.component';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

selectedEmployee: Employee;
  loading = false;
  submitted = false;

  constructor(public dialog: MatDialog, private toast: ToastService, private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder, private userRoleService: UserRoleService) {
    let employeeID = this.route.snapshot.paramMap.get("id")
    this.userService.getEmployee(employeeID).subscribe(res => {
      this.selectedEmployee = res
      this.f.firstname.setValue(res.firstname);
      this.f.lastname.setValue(res.name);
    });
  }

  ngOnInit() {
  }

  memberForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]]
  });

  get f() { return this.memberForm.controls; }

  onSubmit() {
    if (this.memberForm.valid) {
      this.loading = true;
      var newEmployee: Employee = {
        employeeID: this.selectedEmployee.employeeID,
        firstname: this.f.firstname.value,
        name: this.f.lastname.value,
      }
      console.log(newEmployee)
      this.userService.updateEmployee(newEmployee).subscribe(res => {
        this.loading = false;
        this.toast.show({
          text: `Werknemer geüpdatet!`,
          type: 'success',
        })
        this.back();
      })
    }
  }

  back() {
    this.router.navigate(['members'])
  }

}
