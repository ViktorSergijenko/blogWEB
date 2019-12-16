import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { MatTableDataSource } from '@angular/material';
import { User } from '@app/models/user.model';
import { RegularUserService } from '@app/services/regular-user.service';




@Component({
  selector: 'app-global-admin-user-table',
  templateUrl: './global-admin-user-table.component.html',
  styleUrls: ['./global-admin-user-table.component.scss']
})
export class GlobalAdminUserTableComponent implements OnInit {
  ELEMENT_DATA: User[] = [];
  displayedColumns: string[] = ['fullName', 'userName', 'roleName', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  constructor(
    private userService: RegularUserService
  ) {
   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.getAllUsers();
  }

  addModerator(id: string) {
    this.userService.addModerator(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  removeModerator(id: string) {
    this.userService.removeModerator(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.ELEMENT_DATA = [];
      this.ELEMENT_DATA = users;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

}
