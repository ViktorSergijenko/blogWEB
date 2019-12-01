import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';

export class Region {
  possition: number;
  name: string;
  difference: string;
  time: Time;
}
@Component({
  selector: 'app-global-admin-user-table',
  templateUrl: './global-admin-user-table.component.html',
  styleUrls: ['./global-admin-user-table.component.scss']
})
export class GlobalAdminUserTableComponent implements OnInit {
  regions: Region[] = [];
  constructor() {
    let reg = new Region();
    reg.possition = 1;
    this.regions = [];
  }

  ngOnInit() {}
}
