import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/components/violation/violation/violation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRoleService } from 'src/app/core/services/userRole.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit {
  selectedMember: User;
  loading = false;
  submitted = false;
  userRoles = []
  
  ngOnInit() {

  }

  memberForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    role: ['', [Validators.required]]
  });

  get f() { return this.memberForm.controls; }

  constructor(
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder, private userRoleService: UserRoleService) {
      
      this.userService.getUser(data.user.id).subscribe(res => {
        this.selectedMember = res
        this.f.firstname.setValue(res.firstname);
        this.f.lastname.setValue(res.name);
        this.f.email.setValue(res.email);
        this.f.role.setValue(res.userRole.userRoleID);
        console.log(res.userRole.roleName)
      });
      this.userRoleService.getRoles().subscribe(res => this.userRoles = res);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
