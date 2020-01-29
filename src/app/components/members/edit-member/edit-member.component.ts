import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { UserRoleService } from 'src/app/core/services/userRole.service';
import { ToastService } from 'src/app/toast';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmModelComponent } from 'src/app/shared/components/confirm-model/confirm-model.component';
// import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  selectedMember: User;
  loading = false;
  submitted = false;
  userRoles = []

  constructor(public dialog: MatDialog, private toast: ToastService, private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder, private userRoleService: UserRoleService) {
    let memberId = this.route.snapshot.paramMap.get("id")
    this.userService.getUser(memberId).subscribe(res => {
      this.selectedMember = res
      this.f.firstname.setValue(res.firstname);
      this.f.lastname.setValue(res.name);
      this.f.email.setValue(res.email);
      this.f.role.setValue(res.userRole.userRoleID);
      console.log(res.userRole.roleName)
    });
    this.userRoleService.getRoles().subscribe(res => this.userRoles = res);
  }

  ngOnInit() {
  }

  memberForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    role: ['', [Validators.required]]
  });

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

  onSubmit() {
    if (this.memberForm.invalid && this.f.role.value != "Kies...") {
      return;
    }

    this.loading = true;
    var newUser: User = {
      userID: this.selectedMember.userID,
      email: this.f.email.value,
      firstname: this.f.firstname.value,
      name: this.f.lastname.value,
      userRole: this.userRoles.find(role => role.userRoleID == this.f.role.value),
      userSettings: this.selectedMember.userSettings,
      password: this.selectedMember.password
    }
    console.log(newUser)
    this.userService.updateUser(newUser).subscribe(res => {
      this.loading = false;
      this.toast.show({
        text: `Gebruiker geüpdatet!`,
        type: 'success',
      })
      this.back();
    })
  }

  back() {
    this.router.navigate(['members'])
  }
}
