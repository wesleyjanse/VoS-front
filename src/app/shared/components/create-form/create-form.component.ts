import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/components/violation/violation/violation.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { UserRoleService } from 'src/app/core/services/userRole.service';
import { ToastService } from 'src/app/toast';
import { User } from '../../models/user';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  loading = false;
  submitted = false;
  userRoles = []
  toggleOptions: Array<String> = ["Gebruiker", "Medewerker"];
  selectedValue: String = "Gebruiker"
  newEmployee = false;


  newUserForm: FormGroup;

  selectionChanged(item) {
    this.selectedValue = item.value;
    item.value == "Medewerker" ? this.newEmployee = true : this.newEmployee = false;
  }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['Kies...', [Validators.required]]
    });
  }

  constructor(
    public dialogRef: MatDialogRef<CreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private fb: FormBuilder,
    private userRoleService: UserRoleService,
    private toast: ToastService) {
    this.userRoleService.getRoles().subscribe(res => this.userRoles = res);
  }
  get f() { return this.newUserForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.newUserForm.invalid || this.f.role.value == "Kies...") {
      return;
    }
    this.loading = true;
    if (!this.newEmployee) {
      var newUser = {
        email: this.f.email.value,
        firstname: this.f.firstname.value,
        name: this.f.lastname.value,
        userRole: this.userRoles.find(role => role.userRoleID == this.f.role.value)
      }
      console.log(newUser)
      this.userService.createUser(newUser).subscribe(res => {
        this.loading = false;
        this.toast.show({
          text: `Gebruiker aangemaakt!`,
          type: 'success',
        })
        this.loading = false;
        this.dialogRef.close(true);
      })
    } else {
      var newEmp = {
        firstname: this.f.firstname.value,
        name: this.f.lastname.value
      }
      console.log(newUser)
      this.userService.createEmployee(newEmp).subscribe(res => {
        this.loading = false;
        this.toast.show({
          text: `Medewerker aangemaakt!`,
          type: 'success',
        })
        this.loading = false;
        this.dialogRef.close(true);
      })
    }
  }

}
