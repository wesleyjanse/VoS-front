import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { DataTableModel } from 'src/app/shared/models/dataTableModel';
import { Router } from '@angular/router';
import { MemberDialogComponent } from 'src/app/shared/components/member-dialog/member-dialog.component';
import { CreateFormComponent } from 'src/app/shared/components/create-form/create-form.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  data = [];
  users: User[];
  dataSource;
  displayedColumns: string[] = ['Id', 'Firstname', 'Lastname', 'Type', 'Actions'];
  loading = false;


  constructor(public dialog: MatDialog, private userService: UserService, private router: Router) {
  }

  
  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  ngOnInit() {
    this.loading = true;
    this.dataSource = new MatTableDataSource([]);
    this.users = []
    this.data = []
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      res.map(user => {
        var temp: DataTableModel = {
          id: user.userID,
          name: user.name,
          firstname: user.firstname,
          type: user.userRole.roleName
        }
        this.data.push(temp);
      })
      this.userService.getEmployees().subscribe(res => {
        res.map(user => {
          var temp: DataTableModel = {
            id: user.employeeID,
            name: user.name,
            firstname: user.firstname,
            type: 'employee'
          }
          this.data.push(temp);
        })
        this.dataSource = new MatTableDataSource<User>(this.data.filter(user => {
          return user.type != "employee" ? user : null
        }));
        console.log(this.dataSource.data)
        this.loading = false;
      })
    })
  }

  onChange(e) {
    if (e.checked) {
      this.dataSource = new MatTableDataSource<User>(this.data);
    } else {
      this.dataSource = new MatTableDataSource<User>(this.data.filter(user => {
        return user.type != "employee" ? user : null
      }));
    }
  }

  newMember(){
    const dialogRef = this.dialog.open(CreateFormComponent, {
      data: {
        width: '350px',
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.ngOnInit();
        }
      }
    );
  }

  open(element) {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      data: {
        width: '350px',
        user: element,
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.ngOnInit();
        }
      }
    );
  }
}
