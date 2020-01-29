import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  selectedMember: User;
  loading = false;
  submitted = false;


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder) {
    let memberId = this.route.snapshot.paramMap.get("id")
    this.userService.getUser(memberId).subscribe(res => {
      this.selectedMember = res
      this.f.firstname.setValue(res.firstname);
      this.f.lastname.setValue(res.name);
      this.f.email.setValue(res.email);
      this.f.role.setValue(res.userRole.roleName);
      console.log(res.userRole.roleName)
    });
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


  back(){
    this.router.navigate(['members'])
  }
}
