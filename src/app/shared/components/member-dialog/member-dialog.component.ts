import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserRoleService } from 'src/app/core/services/userRole.service';
import { User } from '../../models/user';
import { ConfirmModelComponent } from '../confirm-model/confirm-model.component';
import { ToastService } from 'src/app/toast';
import { Employee } from '../../models/employee';
import { DataTableModel } from '../../models/dataTableModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface DialogData {
  user: DataTableModel;
}

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit {
  selectedMember: User;
  selectedEmployee: Employee;
  loading = false;
  submitted = false;
  userRoles = []
  qrCode;
  fileName;

  ngOnInit() {
    this.fileName = `Qr Code - ${this.data.user.firstname} ${this.data.user.name}`
    this.qrCode = this.data.user.id.toString();
    if (this.data.user.type !== 'employee') {
      this.memberForm = this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required]],
        role: ['', [Validators.required]]
      });
    } else {
      this.memberForm = this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
      });
    }
  }


  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      width: '400px',
      data: {
        title: `Verwijder ${this.data.user.type != 'employee' ? 'gebruiker' : 'medewerker'}`,
        info: `Bent u zeker dat u *${this.data.user.type != 'employee' ? this.selectedMember.firstname : this.selectedEmployee.firstname} ${this.data.user.type != 'employee' ? this.selectedMember.name : this.selectedEmployee.name}* wilt verwijder?`
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          if (this.data.user.type != 'employee') {
            this.userService.deleteUser(this.selectedMember.userID).subscribe(res => {
              this.toast.show({
                text: `Gebruiker verwijderd!`,
                type: 'info',
              })
            })
          } else {
            this.userService.deleteEmployee(this.selectedEmployee.employeeID).subscribe(res => {
              this.toast.show({
                text: `Medewerker verwijderd!`,
                type: 'info',
              })
            })
          }
          this.dialogRef.close(true);
        }
      }
    );
  }

  href: string;
  download() {
    this.href = document.getElementsByTagName('img')[1].src;
  }

  memberForm: FormGroup;

  get f() { return this.memberForm.controls; }

  changePassword() {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      width: '400px',
      data: {
        title: 'Herstel wachtwoord',
        info: `Bent u zeker dat u het wachtwoord voor ${this.selectedMember.firstname} ${this.selectedMember.name} wilt herstellen?`
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.userService.resetPaswoord(this.selectedMember.userID).subscribe(res => {
            this.toast.show({
              text: `Wachtwoord hersteld!`,
              type: 'info',
            })
          })
        }
      }
    );
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    private userRoleService: UserRoleService,
    private toast: ToastService) {
    if (data.user.type !== 'employee') {
      this.userService.getUser(data.user.id).subscribe(res => {
        this.selectedMember = res
        this.f.firstname.setValue(res.firstname);
        this.f.lastname.setValue(res.name);
        this.f.email.setValue(res.email);
        this.f.role.setValue(res.userRole.userRoleID);
      });
      this.userRoleService.getRoles().subscribe(res => this.userRoles = res);
    } else {
      this.userService.getEmployee(data.user.id).subscribe(res => {
        this.selectedEmployee = res
        this.f.firstname.setValue(res.firstname);
        this.f.lastname.setValue(res.name);
      })
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.memberForm.invalid || this.f.role.value != 'Kies...') {
      return;
    }

    this.loading = true;

    if (this.data.user.type !== 'employee') {
      var newUser: User = {
        userID: this.selectedMember.userID,
        email: this.f.email.value,
        firstname: this.f.firstname.value,
        name: this.f.lastname.value,
        passwordChanged: this.selectedMember.passwordChanged,
        userRole: this.userRoles.find(role => role.userRoleID == this.f.role.value),
        userSettings: this.selectedMember.userSettings,
        password: this.selectedMember.password
      }
      this.userService.updateUser(newUser).subscribe(res => {
        this.loading = false;
        this.toast.show({
          text: `Gebruiker geüpdatet!`,
          type: 'success',
        })
        this.dialogRef.close(true);
      })
    } else {
      console.log("UPDATE EMPLOYEE")
      var newEmployee: Employee = {
        employeeID: this.selectedEmployee.employeeID,
        firstname: this.f.firstname.value,
        name: this.f.lastname.value,
      }
      this.userService.updateEmployee(newEmployee).subscribe(res => {
        this.loading = false;
        this.toast.show({
          text: `Werknemer geüpdatet!`,
          type: 'success',
        })
        this.dialogRef.close(true);
      })
    }
  }
}
