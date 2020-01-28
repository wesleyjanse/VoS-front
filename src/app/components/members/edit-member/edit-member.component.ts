import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { 
    let memberId = this.route.snapshot.paramMap.get("id")
    console.log(memberId)
  }

  ngOnInit() {
  }

}
