import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DataTableModel } from 'src/app/shared/models/dataTableModel';
import { Router } from '@angular/router';
import { MemberDialogComponent } from 'src/app/shared/components/member-dialog/member-dialog.component';

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
    this.loading = true;
    this.dataSource = new MatTableDataSource([]);
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
        this.loading = false;
      })
    })
  }

  ngOnInit() {
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

  open(element) {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      width: 'fit-content',
      data: {
        user: element,
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          
        }
      }
    );
  }

  createQr(element) {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      width: 'fit-content',
      data: {
        user: element,
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          
        }
      }
    );
  }

  edit(element) {
    // console.log(element)
    var temp;
    if (element.type != "employee") {
      // this.userService.getUser(element.id).subscribe(res => {
      //   temp = res
      //   console.log(res)
      // });
      this.router.navigate([`members/${element.id}/edit`])
    } else {
      // this.userService.getEmployee(element.id).subscribe(res => {
      //   temp = res
      //   console.log(res)
      // });
      this.router.navigate([`employees/${element.id}/edit`])
    }
  }
}
